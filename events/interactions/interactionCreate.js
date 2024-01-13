const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",

  /**
   *
   * @param { ChatInputCommandInteraction } interaction
   *
   */

  execute: async (interaction, client) => {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) {
        return interaction.reply({
          content: "Este comando está desactualizado.",
          ephermal: true,
        });
      }

      /*if (command.developer && interaction.user.id !== process.env.OWNER_ID)
        return interaction.reply({
          content:
            "Este comando es solamente para los desarrolladores del bot.",
          ephemeral: true,
        });*/

      try {
        command.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);

      if (!button) {
        return new Error(`Este botón no tiene código.`);
      }

      try {
        await button.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    } else {
      return;
    }
  },
};
