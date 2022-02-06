const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const Images = require("discord-images")
const images = new Images.Client()

module.exports = {
  name: "kiss",
  description: "kiss someone",
  category: "Gifs",
  async execute(bot, message) {
    const data = images.kiss()
      
    const user = message.mentions.users.first() || message.author;
    const kissed = message.author.id === user.id ? "themselfs" : user.username;

    const embed = new MessageEmbed()
      .setTitle(`${message.author.username} Kissed ${kissed}`)
      .setFooter(message.author.username)
      .setColor("BLUE")

      .setImage(`${data}`)
      .setTimestamp();

    message.channel.send({embeds: [embed]});
  },
};
