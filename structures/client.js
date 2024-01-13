const {
  Client,
  GatewayIntentBits,
  Partials,
  ActivityType,
  Collection,
  PresenceUpdateStatus,
} = require("discord.js");

require("dotenv").config();
const loadFiles = require("./utils");

module.exports = class extends Client {
  constructor(
    options = {
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
      ],

      partials: [
        Partials.User,
        Partials.Channel,
        Partials.Message,
        Partials.GuildMember,
        Partials.ThreadMember,
      ],

      allowedMentions: {
        parse: ["roles", "users"],
        repliedUser: false,
      },

      presence: {
        activities: [
          {
            name: process.env.STATUS,
            type: ActivityType[process.env.STATUS_TYPE],
            status: PresenceUpdateStatus.Online,
          },
        ],
      },
    }
  ) {
    super({
      ...options,
    });

    this.events = new Collection();
    this.commands = new Collection();
    this.prefixCommands = new Collection();

    this.start();
  }

  async start() {
    await this.loadEvents();
    await this.loadHandlers();

    this.login(process.env.TOKEN);
  }

  async loadEvents() {
    await this.removeAllListeners;

    this.loadEvents = new Map();

    const files = await loadFiles("./events");

    for (const file of files) {
      const event = require(file);
      const execute = (...args) => event.execute(...args, this);
      if (event.rest) {
        if (event.once) this.rest.once(event.name, execute);
        else this.rest.on(event.name, execute);
      } else {
        if (event.once) this.once(event.name, execute);
        else this.on(event.name, execute);
      }
    }

    console.log(`Loaded events. [${files.length}]`.bold.blue);
  }

  async loadHandlers() {
    const files = await loadFiles("./handlers");

    for (const file of files) {
      require(file)(this);
    }

    console.log(`Loaded handlers. [${files.length}]`.bold.blue);
  }

  async loadCommands() {
    await this.commands.clear();

    let commandArray = new Array();

    const files = await loadFiles("./commands/slash");

    files.forEach((file) => {
      const command = require(file);
      const splitted = file.split("/");
      const directory = splitted[splitted.length - 2];

      const properties = { directory, ...command };

      if (command.data) {
        this.commands.set(command.data.name, properties);

        commandArray.push(command.data.toJSON());
      }
    });

    this.application.commands.set(commandArray);

    console.log(`Loaded slash commands. [${files.length}]`.bold.blue);
  }

  async loadPrefixCommands() {
    await this.prefixCommands.clear();

    const files = await loadFiles("./commands/prefix");

    files.forEach((file) => {
      const command = require(file);

      this.prefixCommands.set(command.name, command);
    });

    console.log(`Loaded prefix commands. [${files.length}]`.bold.blue);
  }
};
