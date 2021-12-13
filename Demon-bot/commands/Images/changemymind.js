const canvacord = require('canvacord');
const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
	name: 'changemymind',
category: "Images", 
	async execute(bot, message, args) {
	let mess = args.join(" ")
	if(!mess) return message.channel.send("**Please specify your message**!")
const user = message.mentions.users.first() || message.author;
	const msg = await message.channel.send('Please wait......')
		let avatar = user.displayAvatarURL({ dynamic: false, format: 'png'})
		let image = await canvacord.Canvas.changemymind(mess);
		let attachment = new MessageAttachment(image, 'changemymind.gif');
		message.channel.send({files: [attachment]})
		.then(() => {
			msg.delete()
		})
	}
};
