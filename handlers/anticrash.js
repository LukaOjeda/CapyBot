const { EmbedBuilder, WebhookClient } = require("discord.js");
const webhook = new WebhookClient({
  url: "https://discord.com/api/webhooks/1067321984209408110/R9QgLFK58FPrABkBXdBqtsa7kN7rESM0mYkhGp0-unJHE357udgGDtYexpYBo4wLOXaB",
});

module.exports = (client) => {
  process.removeAllListeners();

  const embed = new EmbedBuilder().setColor("Red");

  client.on("error", (err) => {
    console.log("[ANTI-CRASH] ¡ERROR ENCONTRADO!\n");
    console.log(err);

    embed.setDescription(`\`\`\`${err}\`\`\``);

    return webhook.send({ embeds: [embed] });
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.log("[ANTI-CRASH] ¡ERROR ENCONTRADO!");
    console.log(reason, "\n", promise);

    embed.setDescription(`\`\`\`${reason} \n ${promise}\`\`\``);

    return webhook.send({ embeds: [embed] });
  });

  process.on("uncaughtException", (err, origin) => {
    console.log("[ANTI-CRASH] ¡ERROR ENCONTRADO!");
    console.log(err, "\n", origin);

    embed.setDescription(`\`\`\`${err} \n ${origin}\`\`\``);

    return webhook.send({ embeds: [embed] });
  });

  process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log("[ANTI-CRASH] ¡ERROR ENCONTRADO!");
    console.log(err, "\n", origin);

    embed.setDescription(`\`\`\`${err} \n ${origin}\`\`\``);

    return webhook.send({ embeds: [embed] });
  });

  process.on("warning", (warn) => {
    console.log("[ANTI-CRASH] ¡ERROR ENCONTRADO!");
    console.log(warn);

    embed.setDescription(`\`\`\`${warn}\`\`\``);

    return webhook.send({ embeds: [embed] });
  });
};
