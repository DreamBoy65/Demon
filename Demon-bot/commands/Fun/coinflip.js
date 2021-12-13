module.exports = {
  name: "coinflip",
  aliases: ["cf"],
  category: "fun",
  description: "flip the coin",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["cf"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  execute: async(client, message, args) => {
    try {
      let msg = await message.send(`Flipping coin... <a:CoinFlip:844821009650548756>`)

      await client.functions.delay(5000)

      let url;
      let result;

      let count = Math.floor(Math.random() * 2)

      if(count === 1) {
          result = "heads"
          url = "844821280430489610"
      } else {
          result = "tails"
          url = "844821374417109013"
      }

      msg.delete()

      message.send(`> ${result}`, {
          thumb: `https://cdn.discordapp.com/emojis/${url}.png?v=1`
      })
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}