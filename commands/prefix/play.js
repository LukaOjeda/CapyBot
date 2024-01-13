const { useMainPlayer } = require("discord-player");

module.exports = {
  name: "play",
  alias: ["p"],
  async execute(client, message, args) {
    const player = useMainPlayer();
    const VOICECHANNEL = message.member.voice.channel;
    let track = args.join(" ");

    if (!VOICECHANNEL) {
      return await message.channel.send("`No estás en ningún canal de voz.`");
    } else if (!track) {
      return await message.channel.send(
        "`Si no hay un link o una palabra no puedo buscar.`"
      );
    } else {
      try {
        await player.play(VOICECHANNEL, track, {
          nodeOptions: {
            metadata: message,
          },
        });
      } catch (e) {
        return await message.channel.send(
          `\`Ocurrió un error al intentar buscar:\` **${args}**.`
        );
      }
    }
  },
};
