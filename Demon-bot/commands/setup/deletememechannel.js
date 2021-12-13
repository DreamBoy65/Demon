module.exports = {
  name: "deletememechannel",
  aliases: [],
  category: "setup",
  description: "delete the automatic meme channel.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["deletememechannel"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  execute: async(client, message, args) => {
    try {

      let data = await client.mongo.fetch(`meme-channel_${message.guild.id}`)
      
      if(!data) return message.error("Meme Channel is not setup yet!")

      await client.mongo.delete(`meme-channel_${message.guild.id}`);

      message.success("Successfully deleted meme channel.")
      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}