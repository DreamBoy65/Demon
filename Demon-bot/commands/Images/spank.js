const canvacord = require('canvacord');
const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
	name: 'spank',
category: "Images", 
	description: 'spank you',
	async execute(bot, message, args) {
	
const user = message.mentions.users.first() || message.author;
const user2 = message.author
    
	const msg = await message.channel.send('Please wait......')
	let avatar1 = user2.displayAvatarURL({dynamic: false,  format: 'png'})
		let avatar = user.displayAvatarURL({ dynamic: false, format: 'png'})
		let image = await canvacord.Canvas.spank(avatar1, avatar);
		let attachment = new MessageAttachment(image, 'spank.gif');
		message.channel.send({files: [attachment]})
		.then(() => {
			msg.delete()
		})
	}
};
