const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'cat',
category: "Meme",
	description: 'Sends a random cat image',
	async execute(bot, message, args) {
		const fetch = require('superagent');

		let { body } = await fetch.get('aws.random.cat/meow');
		const embed = new MessageEmbed()
		.setTitle('meowwwwww 🐱🐈😻')
		.setColor('RANDOM')
		.setAuthor(message.author.username, message.author.displayAvatarURL())
		.setImage(body.file)
		.setFooter(`🐈Requested by${message.author.username}`)
		.setTimestamp()
		message.channel.send({embeds: [embed]})
	}
};
