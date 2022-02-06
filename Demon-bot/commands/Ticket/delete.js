module.exports = {
  name: "ticket-delete",
  aliases: [],
  category: "Ticket",
  description: "delete a ticket",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["ticket-delete [channel/optional]"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  execute: async(client, message, args, data) => {
    try {
      let channel = await client.resolvers.resolveChannel({
   message,
   search: args[0],
   channelType: "GUILD_TEXT"
 }) || message.channel

      let ch = data.tickets.opened.find(c => c === channel.id)

      if(!ch) {
        return message.error("You can only delete a ticket... *baka*")
      }

        message.success("ticket deleted.")

      await client.channels.cache.get(channel.id).delete().then(async () => {
        data.tickets.opened = data.tickets.opened.filter(c => c !== channel.id)
        await data.save()
      })
    
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}