const Images = require("discord-images")
const images = new Images.Client()
const {MessageEmbed}= require("discord.js")
module.exports = {
  name: "laugh",
  description: "laugh,  ",
category: "Gifs",
  execute(client, message, args){
    const a = message.author;
    
    message.channel.send({embeds: [new MessageEmbed()
    .setTitle(`${a.username} is Laughing  LOL 🤣😂`)
    .setImage(images.laugh())
    .setColor("RANDOM")
    .setTimestamp()
    ]})
  }
}