const { HangMan } = require('djs-games')

module.exports = {
  name: "hangman",
  description: "hang man game",
  examples: ["hangman"],
  category: "Games", 
  execute: async(client, message, args) => {
    const themes = ["sport", "coding", "nature", "color", "phone brand", "popular game", "camping", "music instrument"]
    const game = new HangMan({
  message: message,
  theme: themes[Math.floor(Math.random() * themes.length)],
  hangManHat: '🎓',
  hangManHead: '🙉',
  hangManShirt: '👚 ',
  hangManPants: '👖 ',
  hangManBoots: '👟👟',
})
game.start()
  }
}