const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

const { useMainPlayer, useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Pará la reproducción de la cola."),
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

      const embed = new EmbedBuilder()
        .setAuthor({
          name: `Reproductor de música`,
          iconURL: `${process.env.CD_IMAGE}`,
        })
        .setDescription(`Se paró la reproducción de la cola.`)
        .setColor(`${process.env.COLOR}`);

      queue.delete();

      return await interaction.editReply({ embeds: [embed] });
    } catch (e) {
      const error = new EmbedBuilder()
        .setDescription(
          `Ocurrió un error al intentar parar la cola de reproducción.`
        )
        .setColor(`${process.env.COLOR}`);

      return await interaction.editReply({ embeds: [error] });
    }
  },
};
