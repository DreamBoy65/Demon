const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
  name: "yesno",
  aliases: [],
  category: "fun",
  description: "yes or no gif.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["yesno"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  execute: async(client, message, args) => {
    try {
        const res = await (await fetch('http://yesno.wtf/api/')).json();

        message.send(`\\👍Yes or \\👎No`, {
            image: res.image
        })

    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}