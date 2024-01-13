const { EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  name: "audioTrackAdd",
  execute: async (interaction, track) => {
    const queue = useQueue(interaction.guild.id);

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Reproductor de música`,
        iconURL: `${process.env.CD_IMAGE}`,
      })
      .setDescription(
        `Se añadió \`${track.title} - ${track.duration}\` a la colaaaaaaa.`
      )
      .setColor(`${process.env.COLOR}`);

    return await queue.metadata.channel.send({ embeds: [embed] });
  },
};
