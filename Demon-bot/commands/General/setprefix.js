const Schema = require('../../models/prefix');

module.exports = {
  name: "prefix",
  aliases: ["setprefix"],
  category: "General",
  description: "set the server prefix. ",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["prefix $"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  run: async(client, message, args) => {
    try {
      let prefix = args[0]

      if(!prefix) return message.error("Provide prefix *baka*")

      if(prefix.length > 5) return message.error("prefix must be 5 or lower in length. ")

      let data = await Schema.findOne({Guild: message.guild.id})

      if(!data) {
        await new Schema({Guild: message.guild.id, Prefix: prefix}).save()

        message.success("Prefix in now set to " + prefix)
        
      } else {
        data.Pefix = prefix;

        await data.save()

        message.success("Prefix in now set to " + prefix)
      }
      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}