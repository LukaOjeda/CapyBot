const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

const { useMainPlayer, useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("salteá la canción que esté sonando actualmente."),
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
      const track = queue.currentTrack;

      const embed = new EmbedBuilder()
        .setAuthor({
          name: `Reproductor de música`,
          iconURL: `${process.env.CD_IMAGE}`,
        })
        .setDescription(
          `Se omitió [${track.title}](${track.url}) de \`${track.author}\`.`
        )
        .setColor(`${process.env.COLOR}`);

      queue.node.skip();

      return await interaction.editReply({ embeds: [embed] });
    } catch (e) {
      const error = new EmbedBuilder()
        .setDescription(`Ocurrió un error al intentar omitir la canción.`)
        .setColor(`${process.env.COLOR}`);

      return await interaction.editReply({ embeds: [error] });
    }
  },
};
