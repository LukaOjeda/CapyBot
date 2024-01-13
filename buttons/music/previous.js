const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "previous",
  },
  async execute(interaction, client) {
    const { member, options, guild, channel } = interaction;
    let queue = client.distube.getQueue(interaction.guild.id);
    const VOICECHANNEL = member.voice.channel;

    if (!VOICECHANNEL) {
      return await interaction.reply({
        content: "`No estás en ningún canal de voz, tontito.`",
        ephemeral: true,
      });
    } else if (
      interaction.guild.members.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.members.me.voice.channelId
    ) {
      return await interaction.reply({
        content:
          "`¡Tenés que estar en el mismo canal de voz que yo para usar este comando!`",
        ephemeral: true,
      });
    } else if (!queue) {
      return await interaction.reply({
        content: "`No hay canciones en la cola.`",
        ephemeral: true,
      });
    } else if (queue.songs.length < 2) {
      return await interaction.reply({
        content: "`No hay canciones en la cola anteriores a ésta.`",
        ephemeral: true,
      });
    } else {
      client.distube.previous(interaction);

      const embed = new EmbedBuilder()
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setDescription(`Pidió reproducir la canción anterior.`)
        .setColor(`${process.env.COLOR}`);

      return interaction.reply({ embeds: [embed] });
    }
  },
};
