const { Fight } = require('weky');
module.exports = {
	name: 'fight',
	description: 'fight with user',
  examples: ["fight @dream"],
	category: 'Games',
	execute: async (client, message, args) => {
		let opponent =
			message.mentions.users.first() ||
			client.users.cache.get(args[0]) ||
			client.users.cache.find(
				r =>
					r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()
			) ||
			client.users.cache.find(
				r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()
			);
		if (!opponent)
			return message.channel.send(
				'**Please Enter A Valid User! Ex- $fight {user}**'
			);
		if (opponent.user.bot)
			return message.channel.send('**Cannot Play Against Bots!**');
		if (opponent.user.id === message.author.id)
			return message.channel.send('**Cannot Play Against Yourself!**');

		await Fight({
			message: message,
			opponent: opponent,
			embed: {
				title: 'Fight | Demon',
				color: '#7289da',
				timestamp: true,
        footer: "demon"
			},
			buttons: {
				hit: 'Hit',
				heal: 'Heal',
				cancel: 'Stop',
				accept: 'Accept',
				deny: 'Deny'
			},
			acceptMessage:
				'<@{{challenger}}> has challenged <@{{opponent}}> for a fight!',
			winMessage: 'GG, <@{{winner}}> won the fight!',
			endMessage:
				"<@{{opponent}}> didn't answer in time. So, I dropped the game!",
			cancelMessage: '<@{{opponent}}> refused to have a fight with you!',
			fightMessage: '{{player}} you go first!',
			opponentsTurnMessage: 'Please wait for your opponents move!',
			highHealthMessage: 'You cannot heal if your HP is above 80!',
			lowHealthMessage: 'You cannot cancel the fight if your HP is below 50!',
			returnWinner: false,
			othersMessage: 'Only'
		});
	}
};
