const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

const { useMainPlayer, useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Obtener la lista de reproducción actual."),
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
      const tracks = queue.tracks.toArray(); //Converts the queue into a array of tracks
      const currentTrack = queue.currentTrack; //Gets the current track being played

      let position = 1;

      const embed = new EmbedBuilder()
        .setAuthor({
          name: `Reproductor de música`,
          iconURL: `${process.env.CD_IMAGE}`,
        })
        .setTitle(`Lista de reproducción`)
        .setDescription(
          `>>> Actualmente sonando: \n **•** [${currentTrack}](${
            currentTrack.url
          })\n\nEn espera: \n ${tracks
            .map(
              (currentTrack) =>
                `${position++} - [${currentTrack.title}](${currentTrack.url})`
            )
            .join("\n")}
            `
        )
        .setColor(`${process.env.COLOR}`);

      return await interaction.editReply({ embeds: [embed] });
    } catch (e) {
      const error = new EmbedBuilder()
        .setDescription(
          `Ocurrió un error al intentar obtener la lista de reproducción.`
        )
        .setColor(`${process.env.COLOR}`);

      return await interaction.editReply({ embeds: [error] });
    }
  },
};
