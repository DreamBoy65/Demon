const RockPaperScissors  = require('../../util/games/rps')

module.exports = {
	name: 'rps',
category: 'Games',
	usage: 'rps [rock] [paper] [scissors]',
	async execute(client, message, args) {
    
const game = new RockPaperScissors({
  message: message,
})

game.start()
	}
};
