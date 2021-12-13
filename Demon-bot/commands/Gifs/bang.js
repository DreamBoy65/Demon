const Images = require("discord-images")
const images = new Images.Client()
const {MessageEmbed}= require("discord.js")
module.exports = {
  name: "bang",
  description: "bang someone",
category: "Gifs",
  execute(client, message, args){
    const a = message.mentions.users.first()
    if(!a) return message.channel.send("**Did you really want to bang yourself**")
    if(message.author.id === a.id) return message.channel.send("**Did you really want to bang yourself**")
    
    message.channel.send({embeds: [new MessageEmbed()
    .setTitle(`${message.author.username} Bang ${a.username}`)
    .setImage(images.bang())
    .setColor("RANDOM")
    .setTimestamp()
    ]})
  }
}