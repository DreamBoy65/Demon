const Discord = require("discord.js")
module.exports = {
  name: "uptime",
  description: 'check the bot uptime',
  aliases: ["botuptime"],
category: "General",
   async execute(client, message, args){
  let days = Math.floor(client.uptime / 86400000);
  let hours = Math.floor(client.uptime / 3600000) % 24;
  let minutes = Math.floor(client.uptime / 60000) % 60;
  let seconds = Math.floor(client.uptime / 1000) % 60;

  let uptime = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(` \`\📝\`\ | **__Uptime:__**`)
    .addField("**Days:**", `${days}`)
    .addField("** Hours: **" , `${hours}`) 
    .addField("** Minutes: **", `${minutes}`) 
    .addField("**Seconds:**", `${seconds}`)
  .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
  .setTimestamp()
  message.channel.send({embeds: [uptime]});
  }
}
