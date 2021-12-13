const { MessageEmbed } = require('discord.js');

module.exports = {
        name: "rolememberinfo",
        aliases: ['rolemembers', 'rmi'],
        category: "Mod",
        description: "Shows List Of Members Having A Role",
        usage: "[role name | role mention | ID]",
        accessableby: "everyone",
    execute: async (client, message, args) => {
        if (args.includes("@everyone")) return;
        
        if (args.includes("@here")) return;

        if (!args[0]) return message.channel.send("**Please Enter A Role!**")

      await message.guild.members.fetch()

      
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!role) return message.channel.send("**Please Enter A Valid Role!**");

        let membersWithRole = message.guild.members.cache.filter(member => {
            return member.roles.cache.find(r => r.name === role.name);
        }).map(member => {
            return member.user.tag;
        })
        if (membersWithRole > 2048) return message.channel.send('**List Is Too Long!**')

        let roleEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setThumbnail(message.guild.iconURL())
            .setTitle(`Users With The ${role.name} Role! [${membersWithRole.length}]`)
            .setDescription(membersWithRole.map((m, i) => `${i+1}• ${m}`).join("\n"));
        message.Reply({embeds: [roleEmbed]});
    }
}