module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(
      `[STATUS] Logged in as ${client.user.tag} - ${client.guilds.cache.size}`
        .bold
    );

    client.loadCommands(client);
    client.loadPrefixCommands(client);
  },
};
