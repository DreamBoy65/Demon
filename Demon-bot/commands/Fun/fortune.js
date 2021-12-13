const randomFortunes = require("random-fortunes")

module.exports = {
  name: "fortune",
  aliases: [],
  category: "fun",
  description: "get random fortunes.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["fortune"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  execute: async(client, message, args) => {
    try {
      message.send(randomFortunes(1).join(" "))
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}