const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "pat",
  description: "pat someone",
  category: "Gifs",
  async execute(bot, message) {
    const data = await fetch("https://nekos.life/api/v2/img/pat").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const hugged = message.author.id === user.id ? "themselfs" : user.username;

    const embed = new MessageEmbed()
      .setTitle(`${message.author.username} pats ${hugged}`)
      .setFooter(message.author.username)
      .setColor("BLUE")

      .setImage(`${data.url}`)
      .setTimestamp();

    message.channel.send({embeds: [embed]});
  },
};
