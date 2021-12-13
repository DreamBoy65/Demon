const Discord = require("discord.js");
const { MessageEmbed, client } = require("discord.js");
const Color = `RANDOM`; //Color Name In CAPS - RANDOM For Random
const Scraper = require("mal-scraper"); //npm i mal-scraper


module.exports = {
    name: "anime",
    category: "Search",
    description: "Anime Information!",
    usage: "Anime <Name>",
    async execute(client, message, args) {

        //Start

        let Text = args.join(" ");
const msg = await message.channel.send('Searching......')
        if (!Text) return message.channel.send(`Please Give Something!`);

        if (Text.length > 200) return message.channel.send(`Text Limit - 200`);

        
        let Replaced = Text.replace(/ +/g, " ");

        let Anime;

        let Embed;

        try {

        Anime = await Scraper.getInfoFromName(Replaced);

        if (!Anime.genres[0] || Anime.genres[0] === null) Anime.genres[0] = "None";

        Embed = new MessageEmbed()
        .setColor(Color || "RANDOM")
        .setURL(Anime.url)
        .setTitle(Anime.title)
        .setDescription(Anime.synopsis)
        .addField(`Type`, Anime.type, true)
        .addField(`Status`, Anime.status, true)
        .addField(`Premiered`, Anime.premiered, true)
        .addField(`Episodes`, Anime.episodes, true)
        .addField(`Duration`, Anime.duration, true)
        .addField(`Popularity`, Anime.popularity, true)
        .addField(`Gneres`, Anime.genres.join(", "))
        .setThumbnail(Anime.picture)
        .setFooter(`Score - ${Anime.score}`)
        .setTimestamp();

        } catch (error) {
          return message.channel.send(`No Anime Found!`);
        };

        return message.channel.send({embeds: [Embed]})
.then(()=>{
	msg.delete()
})
        //End

    }
};
