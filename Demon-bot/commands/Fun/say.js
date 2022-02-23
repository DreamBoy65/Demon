module.exports = {
  name: "say",
  aliases: [],
  category: "fun",
  description: "make the bot copy cat",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["say hehe"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  adminOnly: true,
  execute: async(client, message, args) => {
    try {
        
      message.channel.send(args.length ? args.join(" ") : "No Message received. ")
        
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}