const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause-resume")
    .setDescription("Pausá o reanudá la cola de reproducción"),
  /**
   *
   * @param { ChatInputCommandInteraction } interaction
   * @param { Client } client
   *
   */

  execute: async (interaction, client) => {
    await interaction.deferReply();

    try {
      const queue = useQueue(interaction.guild.id);
      queue.node.setPaused(!queue.node.isPaused());

      if (queue.node.isPaused()) {
        const embed = new EmbedBuilder()
          .setDescription(`Música pausada.`)
          .setColor(`${process.env.COLOR}`);
        return await interaction.editReply({ embeds: [embed] });
      } else {
        const embed = new EmbedBuilder()
          .setDescription(`Música reanudada.`)
          .setColor(`${process.env.COLOR}`);
        return await interaction.editReply({ embeds: [embed] });
      }
    } catch (e) {
      const error = new EmbedBuilder()
        .setDescription(
          `Ocurrió un error al intentar pausar/reanudar la cola de reproducción.`
        )
        .setColor(`${process.env.COLOR}`);

      return await interaction.editReply({ embeds: [error] });
    }
  },
};
