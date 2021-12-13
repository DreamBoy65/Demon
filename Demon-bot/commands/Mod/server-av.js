const Discord = require("discord.js");


module.exports = {
 name: "guild-avatar",
 aliases: ["g-avatar"],
 description: "Get a guild avatar",
 category: "Mod",
 usage: "guild-avatar",
 execute: async (client, message, args) => {
  try {
   const gavatar = message.guild.iconURL({
    dynamic: true,
    format: "png",
    size: 2048,
   });

const row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
    .setLabel("Avatar link")
    .setStyle("LINK")
    .setURL(gavatar))

   const embed = new Discord.MessageEmbed() // Prettier
    .setColor("RANDOM")
    .setDescription("🔗 [Icon link](" + gavatar + ")")
    .setAuthor(message.guild.name + " Icon", gavatar)
    .setImage(gavatar)
    .setTimestamp()
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   message.channel.send({embeds: [embed], components: [row]})
  } catch (err) {
   message.reply({
    embeds: [{
     color: 16734039,
     description: `Something went wrong... :cry:`,
    }]
   });
  }
 },
};