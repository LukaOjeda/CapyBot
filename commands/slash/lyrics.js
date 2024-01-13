const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

const { useMainPlayer, useQueue } = require("discord-player");
const { lyricsExtractor } = require("@discord-player/extractor");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lyrics")
    .setDescription("salteá la canción que esté sonando actualmente."),
  /**
   *
   * @param { ChatInputCommandInteraction } interaction
   * @param { Client } client
   *
   */

  execute: async (interaction, client) => {
    const lyricsFinder = lyricsExtractor();
    const lyrics = await lyricsFinder
      .search("alan walker faded")
      .catch(() => null);
    if (!lyrics)
      return interaction.reply({
        content: "No lyrics found",
        ephemeral: true,
      });

    const trimmedLyrics = lyrics.lyrics.substring(0, 1997);

    try {
      const queue = useQueue(interaction.guild.id);
      const track = queue.currentTrack;

      const embed = new EmbedBuilder()
        .setAuthor({
          name: `Reproductor de música`,
          iconURL: `${process.env.CD_IMAGE}`,
        })
        .setDescription(
          trimmedLyrics.length === 1997 ? `${trimmedLyrics}` : trimmedLyrics
        )
        .setColor(`${process.env.COLOR}`);

      return await interaction.reply({ embeds: [embed] });
    } catch (e) {
      const error = new EmbedBuilder()
        .setDescription(`Ocurrió un error al intentar omitir la canción.`)
        .setColor(`${process.env.COLOR}`);

      console.log(e);
      return interaction.reply({ embeds: [error] });
    }
  },
};
