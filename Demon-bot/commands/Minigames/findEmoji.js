const FindEmoji = require("../../util/games/findEmoji")


module.exports = {
  name: "findemoji",
  description: "find the emoji", 
  examples: ["findemoji"],
  category: "Games", 
  execute: async(client, message, args) => {
    new FindEmoji({
      message: message,
      winMessage: "GG, You won!",
      loseMessage: "sry but you lost *haha*",
      timeOutMessage: "OOII times Up"
    }).start()
  }
}