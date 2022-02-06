module.exports = {
  name: "afk",
  aliases: [],
  category: "General",
  description: "Set afk.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["afk nana"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  execute: async(client, message, args, data) => {
    try {
      await data.afk.push({
          id: message.author.id,
          reason: args.length ? args.join(" ") : "haha",
          time: Date.now()
      })
          
          setTimeout(async() => {
              await data.save()
          }, 5000)

        message.member.setNickname(message.member.nickname ? message.member.nickname : `[AFK] ${message.author.username}`).catch(() => {})

        message.success("You Are Now Afk!\n> Reason: " + args.length ? args.join(" ") : "haha")

    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}