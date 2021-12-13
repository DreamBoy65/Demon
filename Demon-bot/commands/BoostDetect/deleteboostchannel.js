module.exports = {
  name: "deleteboostchannel",
  aliases: [],
  category: "boost",
  description: "delete the boost channel.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["deleteboostchannel"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  execute: async(client, message, args, data) => {
    try {

      if(!data.boostChannel) return message.error("Boost channel is not setup yet!")

      data.boostChannel = null

      await data.save()

      message.success("Successfully deleted boost channel.")
      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}