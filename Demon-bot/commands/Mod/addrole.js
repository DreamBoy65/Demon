const { MessageEmbed } = require("discord.js");


module.exports = {
        name: "role",
        description: "Adds and takes role for a user",
        category: "moderation",
        usage: "[name | nickname | mention | ID] <role>",
category: "Mod",
        accessableby: "Administrator",
    execute: async (bot, message, args) => {

        if (!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send("<a:crosss:844939715816063024> | **You Dont Have The Permissions To Add Roles To Users! - [MANAGE_ROLES]**");
        if (!message.guild.me.permissions.has("MANAGE_ROLES")) return message.channel.send("<a:crosss:844939715816063024> | **I Dont Have The Permissions To Add Roles To Users! - [MANAGE_ROLES]**");
        
        if (!args[0]) return message.channel.send("<a:crosss:844939715816063024> | **Please Enter A Role!**")

        let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!rMember) return message.channel.send("<a:crosss:844939715816063024> | **Please Enter A User Name!**");
        if (rMember.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('<a:crosss:844939715816063024> | **Cannot Add Role To This User!**')

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(rp => rp.name.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase());
        if (!args[1]) return message.channel.send("<a:crosss:844939715816063024> | **Please Enter A Role!**")

        if (!role) return message.channel.send("<a:crosss:844939715816063024> | **Could Not Find That Role!**")

        if (role.managed) return message.channel.send("<a:crosss:844939715816063024> | **Cannot Add That Role To The User!**")
        if (message.guild.me.roles.highest.comparePositionTo(role) <= 0) return message.channel.send('<a:crosss:844939715816063024> | **Role Is Currently Higher Than Me Therefore Cannot Add It To The User!**')

var dembed = new MessageEmbed()    
.setColor("RANDOM")
.setAuthor(message.guild.name, message.guild.iconURL())
  .setDescription(`Role has been removed from ${rMember.user.username}`)


if (rMember.roles.cache.has(role.id)){ await rMember.roles.remove(role.id).then(() => {
        	message.channel.send({embeds: [dembed]})
  })
                                                                      } else {
var sembed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(`Role has been added to ${rMember.user.username}`)
        
        
        
        if (!rMember.roles.cache.has(role.id)) await rMember.roles.add(role.id).then(() => {
        	message.channel.send({embeds: [sembed]})
        })
}
        

    }
};