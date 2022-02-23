module.exports = {
  name: "nick",
  aliases: [],
  category: "Mod",
  description: "set the nickname of user",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["nick <user> <nickname>"],
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

        if(!member) return message.error("Mention a member.")

        let nick = args.slice(1).join(" ")

        if(!nick) return message.error("Mention the nick as well.")

        await member.setNickname(nick).catch(e => {
            message.error("can't change nickname.")
        })
        
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}