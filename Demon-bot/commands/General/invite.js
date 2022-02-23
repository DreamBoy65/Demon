const { MessageEmbed } = require('discord.js')
module.exports = {
	name: "invite",
	description: 'To invite bot in your server ', 
  examples: ["invite"],
category: "General",
	execute (client, message, args){
		const embed = new MessageEmbed()
		.setAuthor(message.author.username)
	.setThumbnail(message.author.displayAvatarURL())
	.setTitle("😊Thanks For Inviting me😊")
	.setColor("RANDOM")
		.setDescription(`[click here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) to invite me..`)
		.setFooter("Now I'm ready to take your soul")
		.setTimestamp()
		message.channel.send({embeds: [embed]})
	}
}