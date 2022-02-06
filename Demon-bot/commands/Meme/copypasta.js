const { MessageEmbed, client} = require("discord.js");
const got = require("got"); //MAKE SURE TO INSTALL THE PACKAGE "GOT" ELSE THE CODE WOULD NOT WORK

module.exports = {
    name: "copypasta",
    aliases: [],
    category: "Meme",
    usage: "amazeme",
    description: "Returns random amazing copy/pasta",
    async execute(client, message, args) {
// AGAIN, MAKE SURE TO INSTALL 'GOT' PACKAGE!

  got('https://www.reddit.com/r/copypasta/random.json').then(response => {
        
        let content = JSON.parse(response.body);
        var title = content[0].data.children[0].data.title;
        var amazeme = content[0].data.children[0].data.selftext;
        let wow = new MessageEmbed()
        .setDescription(`**` + title + `**`)
        .setDescription(amazeme)
        .setFooter(message.author.tag)
        .setColor("RANDOM")
        message.channel.send({embeds: [wow]})
    }).catch(console.error);

    }
};
