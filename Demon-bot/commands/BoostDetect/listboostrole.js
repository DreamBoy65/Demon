module.exports = {
  name: "boostrole-list",
  aliases: [],
  category: "setup",
  description: "list auto boost roles.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["boostrole-list"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  execute: async(client, message, args, data) => {
    try {
      
      if(data?.boostRoles?.length < 1) return message.error("No list found.")

      message.send(`Total: ${data.boostRoles.length}\n\n${data.boostRoles.map((c, i) => `${i+1}• <@&${c.role}>`).join("\n")}`)
      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}