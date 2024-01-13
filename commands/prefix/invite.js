const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  name: "invite",
  alias: [],
  execute: async (client, message, args) => {
    const embed = new EmbedBuilder()
      .setDescription(`¡Muchas gracias por querer invitarme a tu servidor!`)
      .setColor(`${process.env.COLOR}`);

    const inviteLink = new ButtonBuilder()
      .setLabel("Link")
      .setURL(
        "https://discord.com/api/oauth2/authorize?client_id=1057472481461543072&permissions=1099982498838&scope=bot"
      )
      .setStyle(ButtonStyle.Link);

    let inviteButton = new ActionRowBuilder().addComponents([inviteLink]);

    return message.reply({ embeds: [embed], components: [inviteButton] });
  },
};
