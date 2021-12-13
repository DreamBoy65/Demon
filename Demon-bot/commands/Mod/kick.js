const { MessageEmbed, client} = require('discord.js')

module.exports = {
name: "kick",
aliases: [],
usage: "kick <@user> [reason]",
description: "Kick a user from the guild.",
category: 'Mod',
execute: async(client, message, args) => {
    
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(r => r.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) 
      
        let reasonkick = args.slice(1).join(" ")
        
        
    
    if(!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send(`<a:crosss:844939715816063024> | You don't have **KICK_MEMBERS** Permission to Execute this Command`)
    
     if(!user) {
            return message.channel.send('<a:crosss:844939715816063024> | You need to mention someone to kick!');
        }
    if(user.id === message.author.id) return message.channel.send("You can't kick yourself!")
     if (!reasonkick) {
            reasonkick = "No Reason Given"
        }
    
    if (!message.guild.members.cache.get(user.id).kickable) {
            return message.channel.send("<a:crosss:844939715816063024> | That Member couldn't be kicked due to role hierarchy");
        }
let DmEmbed = new MessageEmbed()
    .setDescription(`You were Kicked from ${message.guild.name} for: ${reasonkick}`)
    .setColor("RANDOM")
    
    user.send({embeds: [DmEmbed]}).catch(e => {
      message.channel.send("I can't dm that user!")
    })
   let mem = message.guild.members.cache.get(user.id)
   
   await mem.kick()
    
    let embed = new MessageEmbed()
    .setTitle("User Was Successfully Kicked")
    .setDescription(`${user.username}#${user.discriminator} was kicked by ${message.author.username}`)
    .addField(`Reason :-`, `${reasonkick}`)
    .setColor("RANDOM")
    message.channel.send({embeds: [embed]})
  }
}
