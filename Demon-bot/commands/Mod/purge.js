module.exports = {
	name: 'purge',
	description: 'Clears messages for you!',
	category: 'Mod',
	usage: 'purge <how-many-messages>',
	description: 'delete messages',

	async execute(client, message, args) {
		if (!message.member.permissions.has('MANAGE_MESSAGES'))
			return message.channel.send(
				`<a:crosss:844939715816063024> | You don't have **MANAGE_MESSAGES** Permission to Execute this Command`
			);

		if (!args[0])
			return message.reply(
				'<a:crosss:844939715816063024> | Please enter the amount of messages you want to clear!'
			);
		if (isNaN(args[0]))
			return message.reply(
				'<a:crosss:844939715816063024> | Please enter a real number!'
			);

		if (args[0] > 500)
			return message.reply(
				'<a:crosss:844939715816063024> | You cannot delete more than 500 messages!'
			);
		if (args[0] < 1)
			return message.reply(
				'<a:crosss:844939715816063024> | To delete messages please delete atleast 1 message.'
			);

		await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
			message.channel.bulkDelete(messages);
		});
	}
};
