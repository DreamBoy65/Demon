const Schema = require("../../models/chatbot-channel")

module.exports = {
  name: "removechatbot",
  aliases: [],
  category: "chatbot",
  description: "remove the Chatbot channel.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["deletechatbot"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  execute: async(client, message, args) => {
    try {

        let data = await Schema.findOne({Guild: message.guild.id})

        if(!data) return message.error("Server is not setup yet!")

        await data.delete()

        message.success("Successfully removed chatbot channel.")

    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}