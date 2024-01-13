const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

const { useMainPlayer, useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
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
      return await interaction.editReply("test");
    } catch (e) {
      const error = new EmbedBuilder()
        .setDescription(`Ocurrió un error al intentar omitir la canción.`)
        .setColor(`${process.env.COLOR}`);

      return await interaction.editReply({ embeds: [error] });
    }
  },
};
