const { MessageEmbed, client } = require("discord.js");

//By Legendary Keker

module.exports = {
    name: "emojinfo",
    category: "info",
    description: "Show Emoji Information!",
    usage: "Emojinfo <Emoji>",
category: 'Mod',
    async execute(client, message, args)  {
if(!message.member.permissions.has("MANAGE_SERVER" || "MANAGE_EMOJIS")) return message.channel.send(`<a:crosss:844939715816063024> | You don't have **MANAGE_SERVER** , **MANAGE_EMOJIS** Permission to Execute this Command`)
    
        //Start

        if (!args[0] || !args[0].startsWith("<") || !args[0].endsWith(">") || !args[0].includes(":")) return message.channel.send(`<a:crosss:844939715816063024> | Please Give A Valid Custom Emoji!`);

        let Thinger = args[0].split(":");

        let Animated;
        if (Thinger[0] === "<a") {
          Animated = true;
        } else {
          Animated = false;
        };

        const Name = Thinger[1];
        const ID = Thinger[2].slice(0, -1);
        const Link = `https://cdn.discordapp.com/emojis/${ID}.${Animated ? "gif" : "png"}?v=1`;

        const Embed = new MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(Link)
        .setTitle(`Emoji Information!`)
        .addField(`Name`, Name, true)
        .addField(`ID`, ID, true)
        .addField(`Animated`, Animated ? "Yes" : "No", true)
        .addField(`Link`, `[Click Me](${Link})`)
        .setFooter(`Requested by ${message.author.username}`)
.setTimestamp()
        return message.channel.send({embeds: [Embed]});

        //End

    }
};
