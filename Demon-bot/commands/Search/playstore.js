const { MessageEmbed, client} = require("discord.js");
const PlayStore = require("google-play-scraper");
const EmbedColor = ``;

//By Legendary Emoji | :D

module.exports = {
  name: "playstore",
  aliases: ["pstore", "googleplaystore", "ps"],
  description: "Show Playstore Application Information Of Your Given Name!",
  usage: "Playstore <Application Name>",
    examples: ["playstore free-fire"],
  category: "Search",
  async execute(client, message, args) {
    if (!args[0])
      return message.reply(
        `Please Give Something To Search - ${message.author.username}`
      );

    PlayStore.search({
      term: args.join(" "),
      num: 1
    }).then(Data => {
      let App;

      try {
        App = JSON.parse(JSON.stringify(Data[0]));
      } catch (error) {
        return message.reply(
          `No Application Found - ${message.author.username}!`
        );
      }

      let Embed = new MessageEmbed()
        .setColor(EmbedColor || "RANDOM")
        .setThumbnail(App.icon)
        .setURL(App.url)
        .setTitle(`${App.title}`)
        .setDescription(App.summary)
        .addField(`Price`, App.priceText, true)
        .addField(`Developer`, App.developer, true)
        .addField(`Score`, App.scoreText, true)
        .setFooter(`Requested By ${message.author.username}`)
        .setTimestamp();

      return message.channel.send({embeds: [Embed]});
    });
  }
};
