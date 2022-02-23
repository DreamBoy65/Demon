const {Snake} = require('weky');

module.exports = {
	name: 'snakegame',
	category: 'Games',
	description: 'play a game',
  examples: ["snakegame"],
	async execute(client, message, args) {
	const m =	await Snake({
			message: message,
			embed: {
				title: 'Snake | Demon',
				description: 'GG, you scored **{{score}}** points!',
				color: '#7289da',
				timestamp: true
			},
			emojis: {
				empty: '⬛',
				snakeBody: '🟩',
				food: '🍎',
				up: '⬆️',
				right: '⬅️',
				down: '⬇️',
				left: '➡️'
			},
			othersMessage: 'Only <@{{author}}> can use the buttons!',
			buttonText: 'Cancel'
		})
	}
};
