const Images = require("discord-images")
const images = new Images.Client()
const {MessageEmbed}= require("discord.js")
module.exports = {
  name: "dizzy",
  description: "dizzy ",
category: "Gifs",
  execute(client, message, args){
    const a = message.mentions.users.first() || message.author
    message.channel.send({embeds: [new MessageEmbed()
    .setTitle(`${a.username} is getting  dizzy! 😵`)
    .setImage(images.dizzy())
    .setColor("RANDOM")
    .setTimestamp()
    ]})
  }
}