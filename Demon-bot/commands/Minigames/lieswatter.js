const { LieSwatter } = require("weky")
module.exports = {
  name: "lieswatter",
  description: "lie swaater game",
  category: "Games", 
  execute: async(client, message, args) => {
    await LieSwatter({
	message: message,
	embed: {
		title: 'Lie Swatter',
		color: '#5865F2',
        footer: '©️ Demon',
		timestamp: true
	},
	thinkMessage: 'I am thinking',
	winMessage:
		'GG, It was a **{{answer}}**. You got it correct in **{{time}}**.',
	loseMessage: 'Better luck next time! It was a **{{answer}}**.',
	othersMessage: 'Only <@{{author}}> can use the buttons!',
	buttons: { true: 'Truth', lie: 'Lie' }
});
  }
}