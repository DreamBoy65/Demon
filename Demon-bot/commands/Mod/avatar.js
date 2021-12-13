const { Client, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'avatar',
	description: 'display your avatar',
	aliases: ['av'],
	category: 'Mod',
	category: 'Mod',
	utilisation: '{prefix}avatar',

async	execute(client, message, args) {
		if (!message.member.permissions.has('MANAGE_MESSAGES'))
			return message.channel.send(
				'<a:crosss:844939715816063024> You do not have enough permissions!'
			);

		let user = await message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(r => r.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.author
      

		const avatarEmbed = new MessageEmbed()
			.setColor('RANDOM')
			.setAuthor(user.username)
			.setImage(user.avatarURL({ size: 4096 , dynamic: true }));
		message.reply({embeds: [avatarEmbed]});
	}
};
