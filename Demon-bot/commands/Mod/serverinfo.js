const { client, MessageEmbed } = require('discord.js');
const moment = require('moment');

const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

module.exports = {
	name: 'serverinfo',
	description: 'Forcheckserverinfo',
	aliases: ['si'],
	category: 'Mod',

	async execute(client, message) {
		if (!message.member.permissions.has('ADMINISTRATOR'))
			return message.channel.send(
				'<a:crosss:844939715816063024> | You do not have **ADMINISTRATOR ** permission'
			);
		const members = message.guild.members.cache;
		const guild = message.guild;
		const user = message.author;
		let Owner = [];
		await client.users
			.fetch(message.guild.ownerId)
			.then(o => Owner.push(o.tag));
		const embed = new MessageEmbed()
			.setColor('RANDOM')
			.setAuthor("Server info", message.guild.iconURL())
			.setTitle('Server Info', message.guild)
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField('Owner', Owner.join(" "))
			.addField('Guild ID', guild.id)
			.addField('Guild Description', guild.description || "none")
			.addField(
				'Created At',
				`${moment(message.guild.createdTimestamp).format('LT')} ${moment(
					message.guild.createdTimestamp
				).format('LL')} [${moment(message.guild.createdTimestamp).fromNow()}]`
			)

			.addField('Boosts', `${guild.premiumSubscriptionCount}` || "0")
			.addField('Boost Level', `${guild.premiumTier}` || "0")

			.addField(
				'Verification Level',
				verificationLevels[guild.verificationLevel]
			)

			.addField('Region', `${message.guild.region}`, true)
			.addField('Vanity Url', 'https://discord.gg/' + `${guild.vanityURLCode}`)
			.addField('Features', guild.features.join('\n') || "None")

			.addField(
				'Member Count',
				`${message.guild.members.cache.filter(m => !m.user.bot).size}`
			)
			.addField(
				'Bot Count',
				`${message.guild.members.cache.filter(i => i.user.bot).size}`
			)
			.addField('Roles Count', `${guild.roles.cache.size}`)

			.addField(
				`Text Channel`,
				`⌨${
					`${message.guild.channels.cache.filter(channel => channel.type == 'text')
						.size}`
				}`
			)
			.addField(
				`Voice Channel`,
				`🔉${message.guild.channels.cache.filter(
						channel => channel.type == 'voice'
					).size}`
			)
			.addField('AFK Channel', `${guild.afkChannel}` || 'None')
			.addField('AFK Channel ID', `${guild.afkChannelId}`|| 'None')
			.addField('AFK Timeout', `${guild.afkTimeout}`)
			.setImage(guild.bannerURL({ dynamic: true, format: 'png' }))
			.setFooter(message.author.username, user.displayAvatarURL())
			.setTimestamp();

		message.Reply({embeds: [embed]});
	}
};
