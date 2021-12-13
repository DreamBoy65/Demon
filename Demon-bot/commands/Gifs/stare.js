const Images = require("discord-images")
const images = new Images.Client()
const {MessageEmbed}= require("discord.js")
module.exports = {
  name: "stare",
  description: "stare someone",
category: "Gifs",
  execute(client, message, args){
    const a = message.mentions.users.first()
    if(!a) return message.channel.send("**Did you really want to stare yourself**")
    if(message.author.id === a.id) return message.channel.send("**Did you really want to stare yourself**")
    
    message.channel.send({embeds: [new MessageEmbed()
    .setTitle(`${message.author.username} Stares ${a.username}`)
    .setImage(images.stare())
    .setColor("RANDOM")
    .setTimestamp()
    ]})
  }
}