const { EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  name: "stop",
  alias: ["st"],
  async execute(client, message, args) {
    try {
      const queue = useQueue(message.guild.id);

      const embed = new EmbedBuilder()
        .setAuthor({
          name: `Reproductor de música`,
          iconURL: `${process.env.CD_IMAGE}`,
        })
        .setDescription(`Se paró la reproducción de la cola.`)
        .setColor(`${process.env.COLOR}`);

      queue.delete();

      return message.channel.send({ embeds: [embed] });
    } catch (e) {
      const embed = new EmbedBuilder()
        .setDescription(
          `Ocurrió un error al intentar parar la cola de reproducción.`
        )
        .setColor(`${process.env.COLOR}`);

      message.channel.send({ embeds: [embed] });
    }
  },
};
