const db = require('old-wio.db');
module.exports = {
	name: 'transcript',
	description: 'get a ticket transcript!',
	category: 'Ticket',
	execute: async (client, message, args) => {

		let channelid = await db.fetch('channel');
		const channel =
			message.mentions.channels.first() ||
			message.guild.channels.cache.get(args[0]) ||
			message.channel;

		if (channel.id === channelid) {
			if (message.member.permissions.has('ADMINISTRATOR')) {
				channel.messages.fetch().then(async messages => {
					const output = messages
						.array()
						.reverse()
						.map(
							m =>
								`${new Date(m.createdAt).toLocaleString('en-US')} - ${
									m.author.tag
								}: ${
									m.attachments.size > 0
										? m.attachments.first().proxyURL
										: m.content
								}`
						)
						.join('\n');

					let response;
					try {
						response = await sourcebin.create(
							[
								{
									name: ' ',
									content: output,
									languageId: 'text'
								}
							],
							{
								title: `Chat transcript for ${channel.name}`,
								description: ' '
							}
						);
					} catch (e) {
						return message.channel.send('An error occurred, please try again!');
					}

					const embed = new MessageEmbed()
						.setDescription(`[\`📄 View\`](${response.url})`)
						.setColor('GREEN');
					message.reply(
						'the transcript is complete. Please click the link below to view the transcript',
						{embeds: [embed]}
					);
				});
			}
		} else {
			return message.reply(
				'you cannot use this command here. Please use this command in a open ticket.'
			);
		}
	}
};
