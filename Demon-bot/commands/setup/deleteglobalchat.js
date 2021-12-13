module.exports = {
  name: "deleteglobalchat",
  aliases: [],
  category: "setup",
  description: "delete the globalChat channel.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["deleteglobalchat"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  execute: async(client, message, args, data) => {
    try {

      data.globalChat = null
      await data.save()

      message.success("Successfully deleted global chat channel.")
      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}