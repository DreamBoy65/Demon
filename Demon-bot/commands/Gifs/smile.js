const Images = require("discord-images")
const images = new Images.Client()
const {MessageEmbed}= require("discord.js")
module.exports = {
  name: "smile",
  description: "smile ",
category: "Gifs",
  execute(client, message, args){
    const a = message.mentions.users.first() || message.author
    message.channel.send({embeds: [new MessageEmbed()
    .setTitle(`${a.username} is Smiling  😁😆`)
    .setImage(images.smile())
    .setColor("RANDOM")
    .setTimestamp()
    ]})
  }
}