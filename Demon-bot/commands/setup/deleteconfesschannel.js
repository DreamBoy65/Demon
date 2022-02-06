module.exports = {
  name: "removeconfesschannel",
  aliases: [],
  category: "setup",
  description: "remove the confession channel.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["removeconfesschannel"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  execute: async(client, message, args, data) => {
    try {
        

        data.confess = null
        await data.save()

        message.success("Successfully removed.")
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}