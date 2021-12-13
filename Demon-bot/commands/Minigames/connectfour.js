
module.exports = {
        name: 'connectfour',
        aliases: ['connect4', 'c4'],
        category: 'Games',
        usage: '[name | nickname | mention | ID] <Connect 4 H or V Dots> ',
        description: 'Play A Game Of Connect Four With Another User Until Four Horizontal Or Vertical Lines Are Connected',
    execute: async (bot, message, args, ops) => {
       const { ConnectFour } = require('djs-games')
const game = new ConnectFour({
  message: message,
  player1: '🔴',
  player2: '🟡',
})
game.start()
    }
}