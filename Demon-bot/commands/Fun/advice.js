const fetch = require('node-fetch');

module.exports = {
  name: "advice",
  aliases: [],
  category: "fun",
  description: "gives you random advice",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["advice"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  execute: async(client, message, args) => {
    try {
      let data = await fetch('https://api.adviceslip.com/advice').then(res =>
			res.json()
		);

        message.send(`> Advice: ${data.slip.advice}`)
        
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}