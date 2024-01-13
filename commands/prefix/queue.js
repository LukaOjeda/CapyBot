const { EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  name: "queue",
  alias: [],
  async execute(client, message, args) {
    try {
      const queue = useQueue(message.guild.id);
      const tracks = queue.tracks.toArray(); //Converts the queue into a array of tracks
      const currentTrack = queue.currentTrack; //Gets the current track being played

      let position = 1;

      const embed = new EmbedBuilder()
        .setAuthor({
          name: `Reproductor de música`,
          iconURL: `${process.env.CD_IMAGE}`,
        })
        .setDescription(
          `>>> Actualmente sonando: \n **•** [${currentTrack}](${
            currentTrack.url
          })\n\nEn espera: \n ${tracks
            .map(
              (currentTrack) =>
                `${position++} - [${currentTrack.title}](${currentTrack.url})`
            )
            .join("\n")}
              `
        )
        .setColor(`${process.env.COLOR}`);

      return message.channel.send({ embeds: [embed] });
    } catch (e) {
      const error = new EmbedBuilder()
        .setDescription(
          `Ocurrió un error al intentar obtener la lista de reproducción.`
        )
        .setColor(`${process.env.COLOR}`);

      message.channel.send({ embeds: [error] });
    }
  },
};
