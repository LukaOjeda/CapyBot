const { EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  name: "audioTracksAdd",
  execute: async (interaction, track) => {
    const queue = useQueue(interaction.guild.id);

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Reproductor de música`,
        iconURL: `${process.env.CD_IMAGE}`,
      })
      .setDescription(`Se añadieron varias canciones a la cola.`)
      .setColor(`${process.env.COLOR}`);

    return await queue.metadata.channel.send({ embeds: [embed] });
  },
};
