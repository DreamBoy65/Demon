const wiki = require("wikijs").default();
const { MessageEmbed } = require('discord.js');

module.exports = {
        name: "wikipedia",
        aliases: ['wiki'],
        category: "Search",
        description: "Shows Results From Wikipedia",
        usage: "[query]",
        accessableby: "everyone",
    execute: async (bot, message, args) => {
        if (!args[0]) return message.channel.send("**Enter A Query!**")
        let m = await message.channel.send({
            embeds: [{
                color: "GREEN",
                title: `Searching Wikipedia just for you ⌛`,
                description: `Please stand by...`,
            }]
        });
        let result;
        const search = await wiki.search(args.join(' '));
        if (!search.results.length) {
            return m.edit({
                embeds: [{
                    color: "GREEN",
                    title: "What was that again? 📚🤓",
                    description: "Even Wikipedia doesn't seem to know what you're talking about.",
                    footer: {
                        text: "Check for typos or try searching for something else!",
                    },
                }],
            })
        }
       result = await wiki.page(search.results[0]);
        try {
            let description = await result.summary();
            if (description.length > 8192) {
                const FirstEmbed = new MessageEmbed()
                    .setAuthor(result.raw.title)
                    .setColor("GREEN")
                    .setDescription(`${description.substring(0, 1950)}...\nArticle is too long, click [**here**](${result.raw.fullurl}) to read more!`);
                return m.edit({embeds: [FirstEmbed]});

            }
           
          if(description.length < 2048) {
                const SecondEmbed = new MessageEmbed()
                    .setAuthor(result.raw.title)
                    .setColor("GREEN")
                    .setDescription(`${description.slice(0, 2048)}`)
                return m.edit('', {embeds: [SecondEmbed]})
          }
       if (description.length > 2048) {
                const ThirdEmbed = new MessageEmbed()
                    .setAuthor(result.raw.title)
                    .setColor("GREEN")
                    .setDescription(description.slice(0, 2048))
                const FourthEmbed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(description.slice(2048, 4096))
                m.edit('', {embeds: [ThirdEmbed]})
           
         message.channel.send('', {embeds: [FourthEmbed]})
       }
      
         
         
          if(desiption.length > 4096 && description.length < 6144) {
                const FifthEmbed = new MessageEmbed()
                    .setAuthor(result.raw.title)
                    .setColor("GREEN")
                    .setDescription(description.slice(0, 2048))
                const SixthEmbed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(description.slice(2048, 4096))
                const SeventhEmbed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(description.slice(4096, description.length))
                await m.edit('', {embeds: [FifthEmbed]})
message.channel.send({embeds: [    SixthEmbed, SeventhEmbed]})
  }
                          if(descption.length > 6144 && description.length < 8192) {
     return m.edit("Result is too Long!")
                          }
        } catch (e) {
      message.channel.send("Error. ")
       }
    }
}