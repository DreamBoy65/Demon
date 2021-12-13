const { client, MessageEmbed } = require("discord.js");
const Color = `RANDOM`;

module.exports = {
  name: "membercount",
  description: 'count members in your server ', 
category: 'Mod',
   async execute(client, message, args){
   
if(!message.member.permissions.has("ADMINISTRATOR", "MANAGE_SERVER")) return message.channel.send(`<a:crosss:844939715816063024> | You don't have **ADMINISTRATOR** OR **MANAGE_SERVER** Permission to Execute this Command`)
    
   
   
    const Members = message.guild.memberCount;
    const bots = message.guild.members.cache.filter(
      member => member.bot === true
    ).size;
    const humans = message.guild.members.cache.filter(
      member => !member.user.bot
    ).size;
    const online = message.guild.members.cache.filter(
      member => member.presence.status === "online"
    ).size;
    const offline = message.guild.members.cache.filter(
      member => member.presence.status === "offline"
    ).size;
    const dnd = message.guild.members.cache.filter(
      member => member.presence.status === "dnd"
    ).size;
    const idle = message.guild.members.cache.filter(
      member => member.presence.status === "idle"
    ).size;

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`Members Information`)
      .addField(`All Members:`, Members)
      .addField("Humans:", humans)
      .addField("Bots:", bots)
      .addField("Online:", online) 
      .addField("Idle:", idle)
      .addField("Dnd:", dnd)
      .addField("Offline:", offline)
      .setTimestamp();

    message.channel.send({embeds: [embed]});
  }
};
