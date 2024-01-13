const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "pauseresume",
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
    } else if (!queue.playing) {
      client.distube.resume(interaction);

      const embed = new EmbedBuilder()
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setDescription(`Reanudó la reproducciónde la cola.`)
        .setColor("#7e6fb1");

      return interaction.channel.send({ embeds: [embed] });
    } else {
      client.distube.pause(interaction);

      const embed = new EmbedBuilder()
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setDescription(`Pausó la reproducción de la cola.`)
        .setColor(`${process.env.COLOR}`);

      return interaction.reply({ embeds: [embed] });
    }
  },
};
