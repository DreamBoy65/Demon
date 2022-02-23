const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')
module.exports = {
	name: 'foxy',
category: "Meme",
examples: ["foxy"],
	description: 'sends you random fox pics',
	async execute(client, message, args){
const res = await fetch('https://randomfox.ca/floof/');
      const img = (await res.json()).image;
      const embed = new MessageEmbed()
        .setTitle('🦊  What does the fox say?  🦊')
        .setImage(img)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
      message.channel.send({embeds: [embed]});
	}}