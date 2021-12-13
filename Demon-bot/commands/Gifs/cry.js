const Images = require("discord-images")
const images = new Images.Client()
const {MessageEmbed}= require("discord.js")
module.exports = {
  name: "cry",
  description: "cryyy ",
category: "Gifs",
  execute(client, message, args){
    const a = message.author;
    
    message.channel.send({embeds: [new MessageEmbed()
    .setTitle(`${a.username} is crying 😭`)
    .setImage(images.cry())
    .setColor("RANDOM")
    .setTimestamp()
    ]})
  }
}