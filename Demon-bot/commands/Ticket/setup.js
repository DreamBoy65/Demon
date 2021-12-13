module.exports = {
	name: 'ticket-setup',
	category: 'Ticket',
	description: 'Set the ticket system',
	execute: async (client, message, args) => {
		if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send("You need Manage_server perms to execute this cmd.")
		const m = await message.reply({
			embeds: [{
				title: 'Would you like to setup the ticket system?',
				color: 'RANDOM'
			}]
		});
		let emoji = await client.function.promptMessage(m, message.author, 50000, [
			'✅',
			'❎'
		]);

		if (emoji === '❎') {
			return m.delete();
		}

		if (emoji === '✅') {
			const parent = await message.guild.channels.create('Tickets', {
				type: 'category'
			});
			const channel = await message.guild.channels.create('Ticket', {
				type: 'text',
				parent: parent.id,
				permissionOverwrites: [
					{
						id: message.guild.id,
						deny: ['SEND_MESSAGES']
					}
				]
			});
			const msg = await channel.send({
				embeds: [{
					title: 'React to open Tickets!',
					color: 'RANDOM',
					author: {
						name: 'Tickets',
						icon_url: client.user.displayAvatarURL()
					}
				}]
			});
			await msg.react('🎟');
			client.data.ticketParent = parent.id;
			client.data.ticketChannel = channel.id;
			client.data.ticketMsg = msg.id;

			await client.data.save();
		}
	}
};
