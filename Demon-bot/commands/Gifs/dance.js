const Images = require("discord-images")
const images = new Images.Client()
const {MessageEmbed}= require("discord.js")
module.exports = {
  name: "dance",
  description: "dance",
category: "Gifs",
  execute(client, message, args){
    const a = message.mentions.users.first() || message.author;
    
    message.channel.send({embeds: [new MessageEmbed()
    .setTitle(`${a.username} is Dancing UWU 💃🕺`)
    .setImage(images.dance())
    .setColor("RANDOM")
    .setTimestamp()
    ]})
  }
}