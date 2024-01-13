const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

const { useMainPlayer, useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("reproducí tu música favorita")
    .addStringOption((option) =>
      option
        .setName(`canción`)
        .setDescription(`Nombre o link de la canción`)
        .setRequired(true)
    ),

  /**
   *
   * @param { ChatInputCommandInteraction } interaction
   * @param { Client } client
   *
   */

  execute: async (interaction, client) => {
    const player = useMainPlayer();

    await interaction.deferReply();

    const VOICECHANNEL = interaction.member.voice.channel;
    if (!VOICECHANNEL) {
      const embed = new EmbedBuilder()
        .setDescription(
          `**¡Tenés que estar en un canal de voz para usar este comando!**`
        )
        .setColor(`${process.env.COLOR}`);

      return await interaction.editReply({ embeds: [embed] });
    }

    const query = interaction.options.getString("canción", true);

    try {
      await player.play(VOICECHANNEL, query, {
        nodeOptions: {
          metadata: interaction,
        },
      });

      return await interaction.editReply(`${process.env.QUERY_COMMAND_ANSWER}`);
    } catch (e) {
      return await interaction.editReply(
        `\`Ocurrió un error al intentar buscar:\` **${query}**.`
      );
    }
  },
};
