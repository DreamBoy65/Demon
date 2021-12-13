const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "smug",
  description: "Smug",
  category: "Gifs",
  async execute(bot, message) {
    const data = await fetch("https://nekos.life/api/v2/img/smug").then((res) =>
      res.json()
    );

    const embed = new MessageEmbed()
      .setFooter(message.author.username)
      .setColor("BLUE")

      .setImage(`${data.url}`)
      .setTimestamp();

    message.channel.send({embeds: [embed]});
  },
};
