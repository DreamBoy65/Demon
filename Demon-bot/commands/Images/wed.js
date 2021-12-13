const Canvas = require("canvas")

const Discord = require("discord.js")

const {join} = require("path")

module.exports = {
  name: "wedding",
  category: "Images",
  execute: async(client, message, args) => {
    try{
      const user1 = message.mentions.users.first()
      const user2 = message.mentions.users.last()

      if(!user1) return message.channel.send("Mention a user\nExample: wedding {@user} {@user}")
if(!user1 || user1.id === user2.id) return message.channel.send("Mention a user\nExample: wedding {@user} {@user}")

      const m = await message.channel.send("Loading.......")
      
		const canvas = Canvas.createCanvas(1770, 2500)
		const ctx = canvas.getContext("2d")
		
		const background = await Canvas.loadImage(join(__dirname, "../../database/image/wed.jpg"))
      
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
      
const avatar1 = await Canvas.loadImage(user1.displayAvatarURL({ format: "png" }))
		ctx.drawImage(avatar1, 300, 650, 300, 300)

      const avatar2 = await Canvas.loadImage(user2.displayAvatarURL({ format: "png" }))
		ctx.drawImage(avatar2, 1150, 650, 300, 300)
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), '../../../love.jpg')
		message.channel.send({files: [attachment]}).then(() => {
			m.delete()
		})
    } catch (e) {
      message.channel.send(e.message)
    }
  }
}