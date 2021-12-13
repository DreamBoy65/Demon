module.exports = async (client, guild) => {
	const logs = client.channels.cache.get('836912231332708352');
	const { MessageEmbed } = require('discord.js');
	const message = guild;
	const embed = new MessageEmbed()
		.setTitle('New Guild Detected!')
		.setDescription(
			`**Guild** :- ${guild.name}\n**Members** :- ${
				guild.memberCount
			}\nNow I'm in :- ${client.guilds.cache.size}`
		)
		.setColor('#ff0000')
		.setThumbnail(guild.iconURL())
		.setTimestamp();
	logs.send({embeds: [embed]});
	let channel;
	let embed2 = new MessageEmbed()
		.setTitle('Thxn for inviting me', client.user.displayAvatarURL())
		.setDescription(
			`**Thanks for inviting me to your server and helping me to grow more. My prefix is \`$\`\nLinks: \n[Support Server](https://discord.gg/nqfnjFyvkg)**`
		)
		.setColor('RANDOM')
		.setFooter(client.user.username, client.user.displayAvatarURL())
		.setThumbnail(guild.iconURL())
		.setTimestamp();

	guild.channels.cache.forEach(c => {
		if (
			c.type === 'text' &&
			!channel &&
			c.permissionsFor(guild.me).has('SEND_MESSAGES', 'EMBED_LINKS')
		)
			return (channel = c);
	});

	channel.send({embeds: [embed2]});
};
