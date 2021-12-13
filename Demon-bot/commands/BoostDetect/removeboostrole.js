module.exports = {
  name: "boostrole-remove",
  aliases: [],
  category: "setup",
  description: "remove auto boost roles.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["boostrole-remove @booster"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  execute: async(client, message, args, data) => {
    try {

      let role = await client.resolvers.resolveRole({
        message,
        search: args.join(" ")
      })

      if(!role) return message.error("Mention a role baka.")

      if(!data.boostRoles.find(c => c.role === role.id)) return message.error("That role is not in the list.")

      data.boostRoles = data.boostRoles.filter(c => c.role !== role.id)

      await data.save()

      message.success("Successfully removed role from list.")
      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}