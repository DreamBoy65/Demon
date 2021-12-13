const Schema = require("../../models/chatbot-channel")

module.exports = {
  name: "setchatbotname",
  aliases: [],
  category: "chatbot",
  description: "set the chatbot name",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["setchatbotname chocy"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  execute: async(client, message, args) => {
    try {
      let name = args.join(" ")

      if(!name) return message.error("Must send name.")

      let data = await Schema.findOne({Guild: message.guild.id})

        if(!data) return message.error("chatbot is not setup yet!")

        data.name = name

        await data.save()

        message.success("Successfully edited chatbot name.")

    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}