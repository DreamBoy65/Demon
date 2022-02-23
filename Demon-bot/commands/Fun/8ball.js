
module.exports = {
  name: "8ball",
  aliases: [],
  category: "fun",
  description: "get a random answer for your question",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["8ball Will i get a gf?"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  execute: async(client, message, args) => {
    try {

        let question = args.join(" ")

        if(!question) question = "am i mad?"
        let array = [
            "yes!",
            "no!",
            "maybe",
            "better to not tell you.",
            "its secret", 
            "who knows", 
            "ask God",
            "im not telling this."
        ]

        message.send(`Question: ${question}\n\n> Answer: ${array[Math.floor(Math.random() * array.length)]}`)
        
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}