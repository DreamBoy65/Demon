const joke = require("one-liner-joke").getRandomJoke;

module.exports = {
  name: "joke",
  aliases: [],
  category: "fun",
  description: "get random joke.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["joke"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  execute: async(client, message, args) => {
    try {
      message.send(joke({ exclude_tags: ["dirty", "racist", "marriage", "sex", "death"] }).body)
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}