module.exports = {
  name: "react",
  category: "misc",
  args: true,
  usage: "<emojiname> <id msg>",
  bot: ["ADD_REACTIONS", "MANAGE_MESSAGES", "MANAGE_EMOJIS"],
  description:
    "Emoji Reaction with ID Message and it must be the name of the emoji, not mentioning emoji",
category: 'Mod',
  async execute(client, message, args) {
    message.delete();
    if (isNaN(args[1])) {
      return message.channel.send(
        "<a:crosss:844939715816063024> | Please provide the message id of the user or bot"
      );
    }
    const reactionEmoji = message.guild.emojis.cache.find(
      emoji => emoji.name === args[0]
    );
    if (!reactionEmoji) {
      return message.channel.send(
        "<a:crosss:844939715816063024> | Please name the emojis, don't mention the emojis and Default Emoji"
      );
    }
    if (isNaN(reactionEmoji)) {
      return message.channel.send(
        "<a:crosss:844939715816063024> | Please name the emojis, don't mention the emojis and Default Emoji"
      );
    }
    const m = await message.channel.messages.fetch(args[1]);
    const filter1 = (reaction, user) =>
      reaction.emoji.name === args[0] && user.id === message.author.id;
    await m.react(reactionEmoji);

    const collector1 = await m.createReactionCollector(filter1);
    collector1.on("collect", async (reaction, user) => {
      reaction.users.remove(client.user.id); // <<== This removes also the bot reaction
    });
  }
};
