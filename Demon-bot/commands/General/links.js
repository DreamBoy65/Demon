const { MessageEmbed}= require("discord.js")

module.exports = {
  name: "links",
category: "General",
  description: "send you different links",
  execute(client, message, args){
    const e = new MessageEmbed()
    .setTitle("My Links")
    .addField("TOP.GG", `[Click Me](https://top.gg/bot/${client.user.id})`)
 .setColor("RANDOM")
 .setFooter(message.author.username, message.author.displayAvatarURL())
 .setTimestamp()
 message.channel.send({embeds: [e]})
  }
}