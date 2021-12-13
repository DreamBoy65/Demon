const { MessageEmbed } = require('discord.js');
const text = require("../../util/string")
module.exports = async (client, guild) => {

    const owner = await client.users.fetch(guild.ownerId)
  .then(owner => owner.tag)
  .catch(() => '<Unfetched Data>');

  const logo = '<:Enter:794918219835637760>';
  const members = text.commatize(guild.memberCount);
  const message = `${logo} : **${members}** members, owned by **${owner}**`;

    
	await client.channels.cache.get(client.config.logs?.guildjoin)?.createWebhook(guild.name, {
    avatar: guild.iconURL({ format: 'png', dynamic: true, size: 128 })
  })
  .then(webhook => Promise.all([webhook.send(message), webhook]))
  .then(([_, webhook]) => webhook.delete())
  .catch(() => {});

    
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
			c.type === 'GUILD_TEXT' &&
			!channel &&
			c.permissionsFor(guild.me).has('SEND_MESSAGES', 'EMBED_LINKS')
		)
			return (channel = c);
	});

	channel.send({embeds: [embed2]});
};
