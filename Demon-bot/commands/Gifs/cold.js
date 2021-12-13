const Images = require("discord-images")
const images = new Images.Client()
const {MessageEmbed}= require("discord.js")
module.exports = {
  name: "cold",
  description: "cold ",
category: "Gifs",
  execute(client, message, args){
    const a = message.mentions.users.first() || message.author
    message.channel.send({embeds: [new MessageEmbed()
    .setTitle(`${a.username} is getting  cold! 🥶`)
    .setImage(images.cold())
    .setColor("RANDOM")
    .setTimestamp()
    ]})
  }
}