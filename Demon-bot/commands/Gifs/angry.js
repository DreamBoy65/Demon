const Images = require("discord-images")
const images = new Images.Client()
const {MessageEmbed}= require("discord.js")
module.exports = {
  name: "angry",
  description: "angry",
  category: "Gifs",
  execute(client, message, args){
    const a = message.author;
    
    message.channel.send({embeds: [new MessageEmbed()
    .setTitle(`${a.username} is Angry 😡😠`)
    .setImage(images.angry())
    .setColor("RANDOM")
    .setTimestamp()
    ]})
  }
}