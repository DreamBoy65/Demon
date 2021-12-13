const fetch = require('node-fetch');

module.exports = {
  name: "animequote",
  aliases: ["aq"],
  category: "fun",
  description: "get random anime quote. ",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["aq"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  execute: async(client, message, args) => {
    try {

        let data = await fetch('https://animechan.vercel.app/api/random').then(response => response.json());

        message.send(`>>> Quote: ${data.quote}\n\nCharacter: ${data.character}\nAnime: ${data.anime}`)
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}