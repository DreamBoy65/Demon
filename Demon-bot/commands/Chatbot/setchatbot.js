const Schema = require("../../models/chatbot-channel")

module.exports = {
  name: "setchatbot",
  aliases: [],
  category: "chatbot",
  description: "set the chatbot channel",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["setchatbot #chatbot"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  execute: async(client, message, args) => {
    try {
      let channel = await client.resolvers.resolveChannel({
          message,
          search: args.join(" "),
          channelType: "GUILD_TEXT"
      })

      if(!channel) return message.error("mention a channel.")

      let data = await Schema.findOne({Guild: message.guild.id})

        if(!data) {
            data = new Schema({
                Guild: message.guild.id,
                Channel: channel.id
            })
        }

        data.Channel = channel.id

        await data.save()

        message.success("Successfully edited chatbot channel.")
        
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}