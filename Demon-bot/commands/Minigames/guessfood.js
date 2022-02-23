const guessFoodByEmoji = require("../../util/games/guessFoodByEmoji")

module.exports = {
  name: "guessfood",
  examples: ["guessfoof"],
  description: "guess the food by emojis",
  category: "Games", 
  execute: async(client, message, args) => {
    new guessFoodByEmoji({
      message,
    }).start()
  }
}