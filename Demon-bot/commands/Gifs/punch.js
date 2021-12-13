const Images = require("discord-images")
const images = new Images.Client()
const {MessageEmbed}= require("discord.js")
module.exports = {
  name: "punch",
category: "Gifs",
  description: "punch someone",
  execute(client, message, args){
    const a = message.mentions.users.first()
    if(!a) return message.channel.send("**Did you really want to punch  yourself**")
    if(message.author.id === a.id) return message.channel.send("**Did you really want to punch yourself**")
    
    message.channel.send({embeds: [new MessageEmbed()
    .setTitle(`${message.author.username} Punch ${a.username}`)
    .setImage(images.punch())
    .setColor("RANDOM")
    .setTimestamp()
    ]})
  }
}