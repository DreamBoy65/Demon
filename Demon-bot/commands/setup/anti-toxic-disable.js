const Schema = require("../../models/anti-toxic")

module.exports = {
  name: "anti-toxic-disable",
  aliases: [],
  category: "setup",
  description: "disable the AntiToxic .",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["anti-toxic-disable"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  execute: async(client, message, args) => {
    try {

      const data = await Schema.findOne({Guild: message.guild.id})

      if(!data) return message.error("Module is not setup yet!")

      await data.delete()

      message.success("Successfully disabled anti-toxic Module.")
      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}