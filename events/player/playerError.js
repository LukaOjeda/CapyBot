const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "playerError",
  execute: async (queue, error) => {
    const embed = new EmbedBuilder()
      .setDescription(
        `Ocurrió un error inesperado con la reproducción. \n\n ${error}`
      )
      .setColor(`${process.env.COLOR}`);

    return await queue.metadata.channel.send({ embeds: [embed] });
  },
};
