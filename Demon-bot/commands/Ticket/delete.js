const db = require("old-wio.db")
module.exports = {
	name: 'delete-ticket',
	category: 'Ticket',
	execute: async (client, message, args) => {
		if (message.member.permissions.has('MANAGE_CHANNELS'))
			return message.Reply({
				embeds: [{
					title: 'You need MANAGE_CHANNELS permission to use this command!',
					color: 'RANDOM'
				}]
			});

		let channel = await db.fetch("channel")
		if(message.channel.id === channel){
		  message.channel.delete()
		} else {
		  message.Reply("You can only use this command in ticket!")
		}
	}
};
