const { EmbedBuilder } = require("discord.js");
const { useQueue, useHistory } = require("discord-player");

module.exports = {
  name: "previous",
  alias: [],
  async execute(client, message, args) {
    try {
      const history = useHistory(interaction.guild.id);
      const queue = useQueue(interaction.guild.id);
      const track = queue.currentTrack;

      const embed = new EmbedBuilder()
        .setDescription(`Se comenzará a reproducir la canción anterior.`)
        .setColor(`${process.env.COLOR}`);

      history.previous();

      return message.channel.send({ embeds: [embed] });
    } catch (e) {
      const error = new EmbedBuilder()
        .setDescription(
          `Ocurrió un error al intentar obtener la canción anterior.`
        )
        .setColor(`${process.env.COLOR}`);

      message.channel.send({ embeds: [error] });
    }
  },
};
