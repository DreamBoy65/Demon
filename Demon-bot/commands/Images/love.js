const Canvas = require("canvas")

const Discord = require("discord.js")

const {join} = require("path")

module.exports = {
	name: "love",
category: "Images", 
	async execute(client, message, args ){
		
		
	const user = message.mentions.users.first() || message.author;
		
		const m = await message.channel.send("Loading.......")
		const canvas = Canvas.createCanvas(1770, 1780)
		const ctx = canvas.getContext("2d")
		
		const background = await Canvas.loadImage(join(__dirname, "../../database/image/love.jpg"))
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
		const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: "png" }))
		ctx.drawImage(avatar, 0, 1195, 660, 600)
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), '../../love.jpg')
		message.channel.send({files: [attachment]}).then(() => {
			m.delete()
		})
	}}