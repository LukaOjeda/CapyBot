const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "error",
  execute: async (queue, error) => {
    const embed = new EmbedBuilder()
      .setDescription(`Ocurrió un error inesperado. \n\n ${error}`)
      .setColor(`${process.env.COLOR}`);

    return await queue.metadata.channel.send({ embeds: [embed] });
  },
};
