const fetch = require('node-fetch')

const { MessageEmbed } = require('discord.js')
module.exports = {
	name: 'meme',
category: "Meme",
examples: ["meme"],
	description: "Sends you random meme",
	async execute(client, message, args ){
		let res = await fetch('https://meme-api.herokuapp.com/gimme');
      res = await res.json();
      const embed = new MessageEmbed()
        .setTitle(res.title)
        .setImage(res.url)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
      message.channel.send({embeds: [embed]})	
		
	}
}