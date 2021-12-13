module.exports = {
  name: "removestickymessage",
  aliases: [],
  category: "fun",
  description: "remove the sticky message from user.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["removestickymessage @dream"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  execute: async(client, message, args) => {
    try {

        let member = await client.resolvers.resolveMember({
            message,
            search: args[0],
        })

        if(!member) return message.error("Mention a member!")

        let m = await client.json.get(`stick-${message.guild.id}_${member.user.id}`)

        if(!m) return message.error("That user doesn't have any stickymsg.")

        await client.json.delete(`stick-${message.guild.id}_${member.user.id}`)

        message.success("Lmao Done.")

        
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}