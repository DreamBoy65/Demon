module.exports = {
  name: "setboostchannel",
  aliases: [],
  category: "boost",
  description: "set the boost channel",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["setboostchannel #Boosts"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  execute: async(client, message, args, data) => {
    try {

      let channel = await client.resolvers.resolveChannel({
        message,
        search: args.join(" "),
        channelType: "GUILD_TEXT"
      })

      if(!channel) return message.error("Mention a channel where you want to set boost.")

      data.boostChannel = channel.id

      await data.save()

      message.success("Setup complete. ")
      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}