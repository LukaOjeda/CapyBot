module.exports = {
  name: "messageCreate",

  execute: async (message, client) => {
    let PREFIX = process.env.PREFIX;

    if (message.author.bot || !message.content.startsWith(PREFIX)) return;
    const args = message.content.slice(PREFIX.length).split(/ +/g);
    const command = args.shift().toLowerCase();

    const messageArray = message.content.split(" ");
    const argument = messageArray.slice(1);
    const cmd = messageArray[0];

    let cmdprefix =
      client.prefixCommands.get(command) ||
      client.prefixCommands.find((c) => c.alias.includes(command));

    if (cmdprefix) {
      cmdprefix.execute(client, message, args);
    }
  },
};
