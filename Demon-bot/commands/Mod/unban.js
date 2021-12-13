const { MessageEmbed } = require("discord.js")

module.exports = {
        name: "unban",
        description: "Unban a user from the guild!",
        usage: "[name | tag | mention | ID] <reason> (optional)",
        category: 'Mod',
        accessableby: "Administrator",
        clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS", "BAN_MEMBERS"],
        memberPermissions: ["BAN_MEMBERS"],
    execute: async (bot, message, args) => {

        if (!args[0]) return message.channel.send("<a:crosss:844939715816063024> | **Please Enter A Name!**")
      
        let bannedMemberInfo = await message.guild.fetchBans()

        let bannedMember;
        bannedMember = bannedMemberInfo.find(b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || bannedMemberInfo.get(args[0]) || bannedMemberInfo.find(bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase());
        if (!bannedMember) return message.channel.send("<a:crosss:844939715816063024> | **Please Provide A Valid Username, Tag Or ID Or The User Is Not Banned!**")

        let reason = args.slice(1).join(" ")

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("<a:crosss:844939715816063024> | **I Don't Have Permissions To Unban Someone! - [BAN_MEMBERS]**")
        try {
            if (reason) {
                message.guild.members.unban(bannedMember.user.id, reason)
                var sembed = new MessageEmbed()
                    .setColor("GREEN")
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setDescription(`**${bannedMember.user.tag} has been unbanned for ${reason}**`)
                message.channel.send({embeds: [sembed]})
            } else {
                message.guild.members.unban(bannedMember.user.id, reason)
                var sembed2 = new MessageEmbed()
                    .setColor("GREEN")
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setDescription(`**${bannedMember.user.tag} has been unbanned**`)
                message.channel.send({embeds: [sembed2]})
            }
        } catch {
            
        }

    }
}