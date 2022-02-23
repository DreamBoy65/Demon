const Discord = require("discord.js");

module.exports = {
 name: "suggest",
 aliases: [],
 description: "Suggest feature in bot",
 category: "General",
 usage: "suggest <suggestion>",
 examples: ["suggest add more games"],
 execute: async (client, message, args) => {
  try {
   const suggestion = args.join(" ");
   if (!suggestion) {
    return message.channel.send({
     embed: {
      color: 16734039,
      description: ":x: | You need to enter a suggestion!",
     },
    });
   }
   if (suggestion.lenght > 1000) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: ":x: | Your suggestion can have a maximum of 1000 characters!",
     },
    });
   }
   const channel = client.channels.cache.get("923709601214517288");
   if (channel) {
    const embed = new Discord.MessageEmbed() // Prettier()
     .setAuthor("🤔" + message.author.username + " suggestion!", message.guild.iconURL())
     .setColor("RANDOM")
     .setDescription(suggestion)
     .addField("Reporter", `<@${message.author.id}> (ID: ${message.author.id})`)
     .addField("User guild", `${message.guild.name} (ID: ${message.guild.id})`)
     .setFooter(
      "Demon",
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setThumbnail(message.guild.iconURL());
    channel.send({embeds: [embed]});
    const success = new Discord.MessageEmbed() // Prettier()
     .setColor("RANDOM")
     .setDescription(`${message.author} your suggestion was send, you can view it in Demon server in <#${config.suggestionschannel}> channel.`)
     .setFooter(`[Demon](${config.server})`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
    message.Reply({embeds: [success]});
   } else {
    return message.Reply({
     embeds: [{
      color: 16734039,
      description: ":x: | I can't find suggestions channel. Mayby the channel didn't exist. If you are the bot developer please configure it in config.",
     }]
    });
   }
  } catch (err) {
   message.Reply({
    embeds: [{
     color: 16734039,
     description: "Something went wrong... :cry:",
    }]
   });
  }
 },
};