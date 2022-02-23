module.exports = {
  name: "cuteness",
  aliases: ["cn"],
  category: "fun",
  description: "check your cuteness level",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["cn"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  execute: async(client, message, args) => {
    try {
       let level = Math.floor(Math.random() * 100)

       let emoji;

       if(level < 50) {
           emoji = "🤢"
       }

       if(level > 50 && level < 60) {
           emoji = "😶"
       }

       if(level > 60 && level < 80) {
           emoji = "😘"
       }

       if(level > 80 && level < 90) {
           emoji = "🥰"
       }

       if(level > 90) {
           emoji = "😍"
       }

       message.send(`${emoji} | You Cuteness level is **${level}**`, {
           thumb: "https://cdn.discordapp.com/emojis/844943551850741820.gif?v=1"
       })
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}