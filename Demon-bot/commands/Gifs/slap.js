const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const Images = require("discord-images")
const images = new Images.Client()

module.exports = {
  name: "slap",
  description: "Slap somebody",
  category: "Gifs",
  async execute(bot, message) {
    const data = images.slap()
    const user = message.mentions.users.first() || message.author;
    const slapped = message.author.id === user.id ? "themselfs" : user.username;

    const embed = new MessageEmbed()
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setTitle(`${message.author.username} Slapped ${slapped}`)

      .setImage(`${data}`)
      .setTimestamp();

    message.channel.send({embeds: [embed]});
  },
};
