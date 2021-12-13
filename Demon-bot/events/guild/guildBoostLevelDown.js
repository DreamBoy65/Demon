const Schema = require('../../models/guild');
module.exports = async (client, member) => {
  if(!member.guild) return;
  
	let data = await Schema.findOne({ id: member.guild.id });

	if (!data) return;

	const logs = member.guild.channels.cache.get(data.boostChannel);
	if (!logs) return;

	const embed = await new Discord.MessageEmbed() // Prettier
		.setTitle(
			`${client.emoji.unboost} Server boost level decreases! ${
				client.emoji.unboost
			}`
		)
		.setThumbnail(member.iconURL())
		.setColor('RANDOM')
		.setDescription(
			`${client.emoji.unboost}` +
				guild.name +
				' now have' +
				newLevel +
				'boost level! (Previous level: ' +
				oldLevel +
				')'
		)
		.setTimestamp()
		.setFooter(guild.name, guild.iconURL());
	logs.send({embeds: [embed]});
};
