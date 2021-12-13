module.exports = {
  name: "boost-test",
  aliases: [],
  category: "boost",
  description: "test the boost module.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["boost-test"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  execute: async(client, message, args, data) => {
    try {

      if(!data.boostChannel) return message.error("Boost channel is not setup yet.")

      client.emit("guildMemberBoost", message.member)

      message.success("Boost module tested!")
 
      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}