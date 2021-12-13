const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'roleinfo',

	aliases: ['rinfo'],
	description: 'shows stats of the mentioned role',
	usage: '[role name | role mention | ID]',
	category: 'Mod',

	execute: async (bot, message, args) => {
		if (!message.member.permissions.has('MANAGE_ROLES'))
			return message.channel.send(
				'<a:crosss:844939715816063024> | You need **Manage_roles** permission to use this command '
			);

		if (!args[0])
			return message.channel.send(
				'<a:crosss:844939715816063024> | **Please Enter A Role!**'
			);
		let role =
			message.mentions.roles.first() ||
			message.guild.roles.cache.get(args[0]) ||
			message.guild.roles.cache.find(
				r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()
			);
		if (!role)
			return message.channel.send(
				'<a:crosss:844939715816063024> | **Please Enter A Valid Role!**'
			);

		const status = {
			false: 'No',
			true: 'Yes'
		};

		let roleembed = new MessageEmbed()
			.setColor('#00ff00')
			.setAuthor('Role Info')
			.setThumbnail(message.guild.iconURL())
			.addField('**ID**', `\`${role.id}\``, true)
			.addField('**Name**', role.name, true)
			.addField('**Hex**', role.hexColor)
			.addField('**Members**', role.members.size.toString())
			.addField('**Position**', role.position.toString())
			.addField('**Mentionable**', status[role.mentionable])
			.setFooter(message.member.displayName, message.author.displayAvatarURL())
			.setTimestamp();

		message.channel.send({embeds: [roleembed]});
	}
};
