const { EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  name: "pause",
  alias: ["pa", "reanude", "re"],
  async execute(client, message, args) {
    try {
      const queue = useQueue(message.guild.id);
      queue.node.setPaused(!queue.node.isPaused());

      if (queue.node.isPaused()) {
        const embed = new EmbedBuilder()
          .setAuthor({
            name: `Reproductor de música`,
            iconURL: `${process.env.CD_IMAGE}`,
          })
          .setDescription(`Música pausada.`)
          .setColor(`${process.env.COLOR}`);
        return message.channel.send({ embeds: [embed] });
      } else {
        const embed = new EmbedBuilder()
          .setAuthor({
            name: `Reproductor de música`,
            iconURL: `${process.env.CD_IMAGE}`,
          })
          .setDescription(`Música reanudada.`)
          .setColor(`${process.env.COLOR}`);
        return message.channel.send({ embeds: [embed] });
      }
    } catch (e) {
      const error = new EmbedBuilder()
        .setDescription(
          `Ocurrió un error al intentar pausar/reanudar la cola de reproducción.`
        )
        .setColor(`${process.env.COLOR}`);

      message.channel.send({ embeds: [error] });
    }
  },
};
