const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "slap",
  description: "Slap somebody",
  category: "Gifs",
  async execute(bot, message) {
    const data = await fetch("https://nekos.life/api/v2/img/slap").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const slapped = message.author.id === user.id ? "themselfs" : user.username;

    const embed = new MessageEmbed()
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setTitle(`${message.author.username} Slapped ${slapped}`)

      .setImage(`${data.url}`)
      .setTimestamp();

    message.channel.send({embeds: [embed]});
  },
};
