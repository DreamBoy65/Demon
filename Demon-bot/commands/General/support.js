const {MessageEmbed}=require("discord.js")
module.exports = {
  name: "support",
  description:"sends you support server link",
category: "General",
  execute: async (client, message, args) =>{
    const e = new MessageEmbed()
    .setTitle("Here's my support server")
    .setColor("RANDOM")
    .setDescription("[click me](https://discord.gg/Qs6TTXxeNx)")
    .setFooter(message.author.username, message.author.displayAvatarURL())
   .setTimestamp()
    message.channel.send({embeds: [e]})
  }
}