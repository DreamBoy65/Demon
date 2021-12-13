const Discord = require('discord.js');
module.exports = {
	name: 'snipe',
	description: 'Snipe a deleted message',
	category: 'Mod',
	execute: async (client, message, args) => {
		if (!message.member.permissions.has('MANAGE_MESSAGES'))
			return message.channel.send(
				'<a:crosss:844939715816063024> | You do not have enough permissions!'
			);

		const msg = client.snipes.get(message.channel.id);
		if (!msg) return message.Reply('No deleted messages!');
		const embed = new Discord.MessageEmbed()
			.setAuthor(msg.author, msg.member.user.displayAvatarURL())
			.setDescription(msg.content)
			.setFooter('Sniped 😶')
			.setTimestamp();
		message.Reply({embeds: [embed]});
	}
};
