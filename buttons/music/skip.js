const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "skip",
  },
  async execute(interaction, client) {
    const { member, options, guild, channel } = interaction;
    let queue = client.distube.getQueue(interaction.guild.id);
    const VOICECHANNEL = member.voice.channel;

    if (!VOICECHANNEL) {
      return await interaction.reply({
        content: "`No estás en ningún canal de voz, tontito.`",
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
    } else if (queue.autoplay || queue.songs.length > 1) {
      await interaction.reply({
        content: "`Petición recibida.`",
        ephemeral: true,
      });

      client.distube.skip(interaction);

      const embed = new EmbedBuilder()
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setDescription(`Skipeó la canción.`)
        .setColor(`${process.env.COLOR}`);

      return interaction.channel.send({ embeds: [embed] });
    } else {
      client.distube.stop(interaction);

      const embed = new EmbedBuilder()
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setDescription(`Skipeó la canción. No hay más canciones en la cola.`)
        .setColor(`${process.env.COLOR}`);

      return interaction.reply({ embeds: [embed] });
    }
  },
};
