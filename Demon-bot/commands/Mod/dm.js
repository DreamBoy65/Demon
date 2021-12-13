module.exports = {
  name: "dm",
  description: "DM a user in the guild",
category: 'Mod',
  
  execute(bot, message, args)  {
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send("<a:crosss:844939715816063024> | You do not have **MANAGE_MESSAGES** permission!");
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user)
      return message.channel.send(
        `<a:crosss:844939715816063024> | You did not mention a user, or you gave an invalid id`
      );
    if (!args.slice(1).join(" "))
      return message.channel.send("<a:crosss:844939715816063024> | You did not specify your message");
    user.user
      .send(args.slice(1).join(" "))
      .catch(() => message.channel.send("<a:crosss:844939715816063024> | That user could not be DMed!"))
      .then(() => message.channel.send(`Sent a message to ${user.user.tag}`));
  },
};