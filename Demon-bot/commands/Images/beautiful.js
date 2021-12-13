const canvacord = require('canvacord');
const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
	name: 'beautiful',
category: "Images", 
	async execute(bot, message, args) {
	
const user = message.mentions.users.first() || message.author;
	const msg = await message.channel.send('Please wait......')
		let avatar = user.displayAvatarURL({ dynamic: false, format: 'png'})
		let image = await canvacord.Canvas.beautiful(avatar);
		let attachment = new MessageAttachment(image, 'beautiful.gif');
		message.channel.send({files: [attachment]})
		.then(() => {
			msg.delete()
		})
	}
};
