const moment = require('moment');
const Discord = require('discord.js');
const status = {
	online: 'Online',
	idle: 'Idle',
	dnd: 'Do Not Disturb',
	offline: 'Offline/Invisible'
};
module.exports = {
	name: 'userinfo',
	aliases: ['whois'],
	category: 'Mod',
  memberPermissions: ["MANAGE_GUILD"],
	execute: async (client, message, args) => {

		var permissions = [];
		var acknowledgements = 'None';

		const member = await client.resolvers.resolveMember({
		  message,
		  search: args.join(" ")
		})

		const randomColor = '#000000'.replace(/0/g, function() {
			return (~~(Math.random() * 16)).toString(16);
		});

		if (member.permissions.has('KICK_MEMBERS')) {
			permissions.push('Kick Members');
		}

		if (member.permissions.has('BAN_MEMBERS')) {
			permissions.push('Ban Members');
		}

		if (member.permissions.has('ADMINISTRATOR')) {
			permissions.push('Administrator');
		}

		if (member.permissions.has('MANAGE_MESSAGES')) {
			permissions.push('Manage Messages');
		}

		if (member.permissions.has('MANAGE_CHANNELS')) {
			permissions.push('Manage Channels');
		}

		if (member.permissions.has('MENTION_EVERYONE')) {
			permissions.push('Mention Everyone');
		}

		if (member.permissions.has('MANAGE_NICKNAMES')) {
			permissions.push('Manage Nicknames');
		}

		if (member.permissions.has('MANAGE_ROLES')) {
			permissions.push('Manage Roles');
		}

		if (member.permissions.has('MANAGE_WEBHOOKS')) {
			permissions.push('Manage Webhooks');
		}

		if (member.permissions.has('MANAGE_EMOJIS_AND_STICKERS')) {
			permissions.push('Manage Emojis & stickers');
		}

		if (permissions.length == 0) {
			permissions.push('No Key Permissions Found');
		}
if (member.user.id == message.guild.ownerId) {
			acknowledgements = 'Server Owner';
		} else if (member.permissions.has('ADMINISTRATOR')) {
			acknowledgements = 'Server Admin';
		} else {
			if (member.permissions.has('BAN_MEMBERS', 'KICK_MEMBERS')) {
				acknowledgements = 'Server Moderator';
			} else {
        acknowledgements = "Member"
      }
		} 

		const embed = new Discord.MessageEmbed()
			.setDescription(`<@${member.user.id}>`)
			.setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
			.setColor(randomColor)
			.setFooter(`ID: ${message.author.id}`)
			.setThumbnail(member.user.displayAvatarURL())
			.setTimestamp()
			.addField('Status', `${status[member.user?.presence?.status]}`, true)
			.addField(
				'Joined at: ',
				`${moment(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`,
				true
			)
			.addField(
				'Created at: ',
				`${moment(message.author.createdAt).format(
					'dddd, MMMM Do YYYY, HH:mm:ss'
				)}`,
				true
			)
			.addField('Permissions: ', `${permissions.join(', ')}`, true)
			.addField(
				`Roles [${member.roles.cache.size - 1}]`,
				`${member.roles.cache
					.filter(r => r.id !== message.guild.id)
					.map(x => `${x}`)
					.splice(0, 50)
					.join(' ') || '\u200b'}`
			)

			.addField('Acknowledgements: ', `${acknowledgements}`, true);

		message.reply({embeds: [embed]});
	}
};
