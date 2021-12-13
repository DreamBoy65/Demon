const Schema = require('../../models/guild');
const { MessageEmbed } = require('discord.js');
const db = require('old-wio.db');
const sourcebin = require('sourcebin_js');

module.exports = async (client, reaction, user) => {
	let data = await Schema.findOne({ id: reaction.message.guild.id });

	if (reaction.message.id === data.ticketMsg && reaction.emoji.name === '🎟') {
		reaction.users.remove(user);

		if (db.has(user.username))
			return user.send({
				embeds: [{
					title: 'You have opened ticket already!',
					color: 'RANDOM'
				}]
			});

		const channel = reaction.message.guild.channels
			.create(user.username, {
				parent: data.ticketParent,
				permissionOverwrites: [
					{
						id: reaction.message.guild.id,
						deny: ['VIEW_CHANNEL']
					},
					{
						id: user.id,
						allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
					}
				]
			})
			.then(async channel => {
				db.set(user.username, 'Opened');
				db.set("channel", channel.id)
				const msg = await channel.send(
					`<@${user.id}> Welcome!`,{embeds: [
					new MessageEmbed()
						.setColor('RANDOM')
						.setTitle('Welcome To Your Ticket')
						.setDescription('Please Provide Your Issues')
						.setTimestamp()
						.setFooter(`Ticket For ${user.username}#${user.discriminator}`)
            ]});
				await msg.react('❌');
				db.set('msgid', msg.id);
			});
	}

	if (reaction.emoji.name === '❌') {
		let id = await db.fetch('msgid');
		if (!id) return;
		if (!reaction.message.id === id) return;
		if (user.bot) return;

		const ms = await reaction.message.channel.send({
			embeds: [{
				title: 'Are you sure want to delete to this ticket!',
				color: 'RANDOM'
			}]
		});
		let emoji = await client.function.promptMessage(ms, user, 50000, [
			'✔',
			'🚫'
		]);

		if (emoji === '✔') {
			reaction.message.channel.messages.fetch().then(async messages => {
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
							title: `Chat transcript for ${reaction.message.channel.name}`,
							description: ' '
						}
					);
				} catch (e) {
					return console.log('An error occurred, please try again!' + e);
				}
				const embed = new MessageEmbed()
					.setDescription(`[\`📄 View\`](${response.url})`)
					.setColor('GREEN');
				user.send(
					'Here is a transcript of your ticket, please click the link below to vew the transcript',
					{embeds: [embed]}
				);
			});
			reaction.message.channel.send({
				embeds: [{
					title: 'this ticket will be deleted in 5sec..',
					color: 'RANDOM'
				}]
			});

			setTimeout(() => {
				reaction.message.channel.delete();
			}, 5000);
			await db.delete('msgid');
			await db.delete("channel")
			await db.delete(user.username);
		}
		if (emoji === '🚫') {
			ms.delete();
		}
	}
};
