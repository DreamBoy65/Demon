const { tictactoe } = require("reconlx");
const TicTacToe = require('discord-tictactoe');
const game = new TicTacToe({ language: 'en' })

module.exports = {
	name: "tictactoe",
	aliases: ["ttt"],
category: 'Games',
	async execute(client, message, args){
const user1 = message.author;
const user2 = message.mentions.users.first()

     const { TicTacToe } = require('djs-games')

const game = new TicTacToe({
  message: message,
  xEmoji: '❌', // The Emote for X
  oEmoji: '0️⃣', // The Emote for O
  xColor: 'DANGER',
  oColor: 'PRIMARY', // The Color for O
  embedDescription: 'Tic Tac Toe', // The Description of the embed
  opponent: user2
})
game.start()

  }
}

 