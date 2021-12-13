module.exports = {
  name: "setstickymessage",
  aliases: [],
  category: "fun",
  description: "set the sticky message with user.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["setstickymessage @dream u r baka"],
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

        await client.json.set(`stick-${message.guild.id}_${member.user.id}`, args.join(" "))

        message.success("Lmao Done.")

        
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}