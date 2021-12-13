const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: "shibu",
	description: "gives you random dog pic",
category: "Meme",
	async execute(client, message,args){
const res = await fetch('http://shibe.online/api/shibes');
      const img = (await res.json())[0];
      const embed = new MessageEmbed()
        .setTitle('🐶  Woof!  🐶')
        .setImage(img)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
      message.channel.send({embeds: [embed]})
	}
}