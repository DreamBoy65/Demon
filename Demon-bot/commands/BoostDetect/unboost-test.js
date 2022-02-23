module.exports = {
  name: "unboost-test",
  aliases: [],
  category: "boost",
  description: "test the unboost module",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["unboost-test"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  execute: async(client, message, args, data) => {
    try {

      if(!data.boostChannel) return message.error("Boost channel is not setup yet.")

      client.emit("guildMemberUnboost", message.member)

      message.success("unBoost module tested!")
 
      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}