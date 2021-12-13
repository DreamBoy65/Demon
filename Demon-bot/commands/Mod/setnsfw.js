const a = ["true", "false"]
module.exports = {
  name: "setnsfw",
  description: "set the channel as nsfw! or normal",
category: 'Mod',
  execute: (bot, message, args)=>{
if (!message.member.permissions.has('MANAGE_SERVER', 'MANAGE_CHANNELS')) {
   return message.channel.send("<a:crosss:844939715816063024> | You don't have **MANAGE_SERVER** OR **MANAGE_CHANNELS** Permission to execute this command")
   }
   
const arg = args[0]
let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel;
        if (!channel) return message.channel.send("**Channel Not Found!**");

if(!a.includes(arg)) return message.channel.send("**Choose Between true or false**")
if(arg === "true"){
  if(channel.nsfw === true) return message.channel.send(`**${channel} is already nsfw!**`)
channel.setNSFW(true)

message.channel.send({embeds: [{
  title: "Channel Changed", 
  description: `${channel} is now NSFW`,
  color: "RANDOM"
  
}]})
}
if(arg === "false"){
if(channel.nsfw === false) return message.channel.send(`**${channel} is not a nsfw!**`)
channel.setNSFW(false)

message.channel.send({embeds: [{
  title: "Channel Changed", 
  description: `${channel} is now Normal`,
  color: "RANDOM"
  
}]})
}
  }
}