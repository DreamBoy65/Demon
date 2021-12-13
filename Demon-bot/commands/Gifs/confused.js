const Images = require("discord-images")
const images = new Images.Client()
const {MessageEmbed}= require("discord.js")
module.exports = {
  name: "confused",
  description: "confused",
category: "Gifs",
  execute(client, message, args){
    const a = message.mentions.users.first() || message.author
    message.channel.send({embeds: [new MessageEmbed()
    .setTitle(`${a.username} is Confused  🤨😐`)
    .setImage(images.confused())
    .setColor("RANDOM")
    .setTimestamp()
    ]})
  }
}