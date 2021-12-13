const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'color',
	aliases: ['colour', 'hex'],
	category: "Search", 
	description: 'Shows a random color or a preview of the given color',
	examples: ['color', 'color #ffffff'],
	execute: (client, message, args) => {
		let hex = args.join(' ');

		const color =
			hex.match(/[0-9a-f]{6}/) ||
			Math.floor(Math.random() * 16777215).toString(16);

		return message.channel.send({embeds: [
			new MessageEmbed()
				.setColor(`#${color}`)
				.setImage('https://dummyimage.com/200/' + color)
				.setFooter(`Color ${color} | \©️${new Date().getFullYear()} Demon`)
      ]});
	}
};
