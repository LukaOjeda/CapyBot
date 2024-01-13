const { Player } = require("discord-player");

const { YouTubeExtractor } = require("@discord-player/extractor");

const fs = require("fs");
const loadFiles = require("../structures/utils");

module.exports = async (client) => {
  const player = new Player(client);

  await player.extractors.loadDefault();

  const files = await loadFiles("./events/player");

  for (const file of files) {
    const eventFile = require(file);
    player.events.on(eventFile.name, (...args) =>
      eventFile.execute(...args, player, client)
    );
  }
};
