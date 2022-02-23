const Discord = require("discord.js");

module.exports = {
 name: "checkperm",
 aliases: ["check-perm", "perm-check", "checkperms", "check-perms", "perms-check"],
 description: "Check premission for the bot",
 examples: ["checkperm"],
 category: "General",
 usage: "checkperm",
 execute: async (client, message, args) => {
  try {
   const embed = new Discord.MessageEmbed()
    .setTitle("Premission check")
    .setDescription(
     `These are the bot premissions on this server. If ${client.user.username} misses then some commands & functions will be disabled!
     • \`ADMINISTRATOR\`: ${message.guild.me.permissions.has("ADMINISTRATOR") ? client.emoji.tick : client.emoji.cross}\n
     • \`MANAGE_MESSAGES\`: ${message.guild.me.permissions.has("MANAGE_MESSAGES") ? client.emoji.tick : client.emoji.cross}
     • \`MANAGE_CHANNELS\`: ${message.guild.me.permissions.has("MANAGE_CHANNELS") ? client.emoji.tick : client.emoji.cross}
     • \`KICK_MEMBERS\`: ${message.guild.me.permissions.has("KICK_MEMBERS") ? client.emoji.tick : client.emoji.cross}
     • \`BAN_MEMBERS\`: ${message.guild.me.permissions.has("BAN_MEMBERS") ? client.emoji.tick : client.emoji.cross}
     • \`ADD_REACTIONS\`: ${message.guild.me.permissions.has("ADD_REACTIONS") ? client.emoji.tick : client.emoji.cross}
     • \`MANAGE_EMOJIS\`: ${message.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS") ? client.emoji.tick : client.emoji.cross}
     • \`SEND_MESSAGES\`: ${message.guild.me.permissions.has("SEND_MESSAGES") ? client.emoji.tick : client.emoji.cross}
     • \`MANAGE_MESSAGES\`: ${message.guild.me.permissions.has("MANAGE_MESSAGES") ? client.emoji.tick : client.emoji.cross}
     • \`EMBED_LINKS\`: ${message.guild.me.permissions.has("EMBED_LINKS") ? client.emoji.tick : client.emoji.cross}
     • \`ATTACH_FILES\`: ${message.guild.me.permissions.has("ATTACH_FILES") ?client.emoji.tick : client.emoji.cross}
     • \`USE_EXTERNAL_EMOJIS\`: ${message.guild.me.permissions.has("USE_EXTERNAL_EMOJIS") ? client.emoji.tick : client.emoji.cross}
     • \`CONNECT\`: ${message.guild.me.permissions.has("CONNECT") ? client.emoji.tick : client.emoji.cross}
     • \`SPEAK\`: ${message.guild.me.permissions.has("SPEAK") ? client.emoji.tick : client.emoji.cross}
     `
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );

   message.reply({embeds: [embed]});
  } catch (err) {
   message.reply({
    embeds: [{
     color: 16734039,
     description: `Something went wrong... :cry:`,
    }]
   })
   console.log(err)
  }
 },
};