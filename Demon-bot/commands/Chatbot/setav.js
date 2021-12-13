const Schema = require("../../models/chatbot-channel")

module.exports = {
  name: "setchatbotavatar",
  aliases: [],
  category: "chatbot",
  description: "set the chatbot avatar.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["setchatbotavatar {image}"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  execute: async(client, message, args) => {
    try {
      let image = message.attachments.first()

      if(!image) return message.error("Must send image.")

      let data = await Schema.findOne({Guild: message.guild.id})

        if(!data) return message.error("chatbot is not setup yet!")

        data.av = image.url

        await data.save()

        message.success("Successfully edited chatbot avatar.")
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}