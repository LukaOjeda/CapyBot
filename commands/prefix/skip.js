const { EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  name: "skip",
  alias: ["s"],
  async execute(client, message, args) {
    try {
      const queue = useQueue(message.guild.id);
      const track = queue.currentTrack;

      const embed = new EmbedBuilder()
        .setAuthor({
          name: `Reproductor de música`,
          iconURL: `${process.env.CD_IMAGE}`,
        })
        .setDescription(
          `Se omitió [${track.title}](${track.url}) de \`${track.author}\`.`
        )
        .setColor(`${process.env.COLOR}`);

      queue.node.skip();

      return message.channel.send({ embeds: [embed] });
    } catch (e) {
      const error = new EmbedBuilder()
        .setDescription(`Ocurrió un error al intentar omitir la canción.`)
        .setColor(`${process.env.COLOR}`);

      message.channel.send({ embeds: [error] });
    }
  },
};
