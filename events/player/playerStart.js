const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  name: "playerStart",
  execute: async (queue, track) => {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Se está reproduciendo:`,
        iconURL: `${process.env.CD_IMAGE}`,
      })
      .setDescription(
        `## [\`${track.title}\`](${track.url}) \n\n \`${track.author}\` ‎‎ **•** ‎‎ \`${track.duration}\``
      )
      .setThumbnail(track.thumbnail)
      .setFooter({
        text: `${queue.size} canciones en espera ‎‎ • ‎‎ ${queue.durationFormatted}`,
        iconURL: `${process.env.PLAYER_IMAGE}`,
      })
      .setColor(`${process.env.COLOR}`);

    return queue.metadata.channel.send({
      embeds: [embed],
    });
  },
};
