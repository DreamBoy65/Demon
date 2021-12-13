const Images = require("discord-images")
const images = new Images.Client()
const {MessageEmbed}= require("discord.js")
module.exports = {
  name: "wink",
  description: "wink someone",
category: "Gifs",
  execute(client, message, args){
    const a = message.mentions.users.first()
    if(!a) return message.channel.send("**Did you really want to wink yourself**")
    if(message.author.id === a.id) return message.channel.send("**Did you really want to wink yourself**")
    
    message.channel.send({embeds: [new MessageEmbed()
    .setTitle(`${message.author.username} Winks ${a.username}`)
    .setImage(images.wink())
    .setColor("RANDOM")
    .setTimestamp()
    ]})
  }
}