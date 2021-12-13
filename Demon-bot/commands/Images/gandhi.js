const Canvas = require('canvas');
const Discord = require('discord.js');
const { join } = require('path');

module.exports = {
	name: 'gandhi',
	category: 'Images',
	async execute(client, message, args) {
		const { registerFont } = require('canvas');

		const m = await message.channel.send('Loading.......');

		const canvas = Canvas.createCanvas(1700, 1400);
		const ctx = canvas.getContext('2d');

		const background = await Canvas.loadImage(
			join(__dirname, '../../database/image/Gandhi.png')
		);
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

		const a = await client.functions.getWrapText(args.join(' '), 6)
    
		if (!a) return message.channel.send('please specify your message ');
		ctx.font = '200px type'; // Defining Size, Font
		ctx.fillStyle = '#ff0000';
		ctx.fillText(a.join("\n"), 1000, 600, 600, 1500);
		ctx.textAlign = 'center';

		const attachment = new Discord.MessageAttachment(canvas.toBuffer());
		message.channel.send({files: [attachment]}).then(() => {
			m.delete();
		});
	}
};
