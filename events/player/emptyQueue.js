const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "emptyQueue",
  execute: async (queue) => {
    const embed = new EmbedBuilder()
      .setDescription("Cola terminada.")
      .setColor(`${process.env.COLOR}`);

    return await queue.metadata.channel.send({ embeds: [embed] });
  },
};
