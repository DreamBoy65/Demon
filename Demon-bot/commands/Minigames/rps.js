const RockPaperScissors  = require('../../util/games/rps')

module.exports = {
	name: 'rps',
category: 'Games',
    description: "Rps game",
	usage: 'rps [rock] [paper] [scissors]',
    examples: ["rps @haruke"],
	async execute(client, message, args) {
    
const game = new RockPaperScissors({
  message: message,
})

game.start()
	}
};
