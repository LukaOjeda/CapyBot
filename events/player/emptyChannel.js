const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "emptyChannel",
  async execute(queue) {
    const embed = new EmbedBuilder()
      .setDescription("El canal está vacío. Dejo la llamada.")
      .setColor(`${process.env.COLOR}`);

    return await queue.metadata.channel.send({ embeds: [embed] });
  },
};
