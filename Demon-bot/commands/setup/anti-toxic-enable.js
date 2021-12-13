const Schema = require('../../models/anti-toxic');

module.exports = {
  name: "anti-toxic-enable",
  aliases: [],
  category: "setup",
  description: "enable the AntiToxic module.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["anti-toxic-enable #logs"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  execute: async(client, message, args) => {
    try {
      const data = await Schema.findOne({ Guild: message.guild.id });

      let channel = await client.resolvers.resolveChannel({
        message,
        search: args.join(" "),
        channelType: "GUILD_TEXT"
      })

      if(!channel) return message.error("Mention the channel where you want to send logs.")

      if(data) {
        data.Channel = channel.id
        await data.save()
        message.success("Setup complete.")
      } else {
        await new Schema({
          Guild: message.guild.id,
          Channel: channel.id,
          Module: "true"
        }).save()

        message.success("Setup complete.")
      }
      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}