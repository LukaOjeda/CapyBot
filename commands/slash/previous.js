const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

const { useQueue, useHistory } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("previous")
    .setDescription(
      "Volvé atrás y reproducí la canción que estaba sonando anteriormente."
    ),
  /**
   *
   * @param { ChatInputCommandInteraction } interaction
   * @param { Client } client
   *
   */

  execute: async (interaction, client) => {
    await interaction.deferReply();

    try {
      const history = useHistory(interaction.guild.id);
      const queue = useQueue(interaction.guild.id);
      const track = queue.currentTrack;

      const embed = new EmbedBuilder()
        .setDescription(`Se comenzará a reproducir la canción anterior.`)
        .setColor(`${process.env.COLOR}`);

      history.previous();

      return await interaction.editReply({ embeds: [embed] });
    } catch (e) {
      const error = new EmbedBuilder()
        .setAuthor({
          name: `Reproductor de música`,
          iconURL: `${process.env.CD_IMAGE}`,
        })
        .setDescription(
          `Ocurrió un error al intentar obtener la canción anterior.`
        )
        .setColor(`${process.env.COLOR}`);

      return await interaction.editReply({ embeds: [error] });
    }
  },
};
