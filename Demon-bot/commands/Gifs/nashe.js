const gifs = [
	'https://media.tenor.com/images/04ad0e31263ca13c650d6f438d4c8c4a/tenor.gif',
	'https://media.tenor.com/images/aa87cc2a5d0c88b6d19792a04308379b/tenor.gif',
	'https://media.tenor.com/images/72a368d94f740ae6bcd8fa6a7c521239/tenor.gif',
	'https://media.tenor.com/images/9e39ef9638205912c98aedfbe246ba01/tenor.gif',
	'https://media.tenor.com/images/56dcb76330351d9a4892e89a751f7b76/tenor.gif',
	'https://media.tenor.com/images/7dee318cd757eec33ed6496fb759b3f4/tenor.gif',
	'https://media.tenor.com/images/1641d1fdd66aeb506eee2395b3466dc9/tenor.gif'
];
module.exports = {
	name: 'nashe',
	description: 'Nashe ',
	category: 'Gifs',
	execute: (client, message, args) => {
		let Discord = require('discord.js');
		let result = Math.floor(Math.random() * gifs.length);

		let embed = new Discord.MessageEmbed()
			.setTitle(`${message.author.username} saste nashe-----`)
			.setImage(gifs[result], 1000, 1000)
			.setTimestamp()
			.setColor('RANDOM');
		message.Reply({embeds: [embed]});
	}
};
