const { MessageEmbed } = require('discord.js');
const db = require('old-wio.db');
const ms = require('ms');
const moment = require('moment');
module.exports = {
	name: 'timer',
	aliases: ['countDown'],
	description: 'start a timer',
  examples: ["timer 69m"],
	category: 'General',
	execute: async (client, message, args) => {
		let Times = args.join(" ")

		if (!Times || !parseInt(Times))
			return message.Reply({
				embeds: [{
					title: 'Please specify a correct time!',
					color: 'RANDOM'
				}]
			});
		let time = ms(Times);
		let random = Math.floor(Math.random() * 100)
		
		db.set(message.author.id + random, Date.now());

		let i;
		let timePassed;
		let timeLeft = time + 1;

		i = setInterval(async () => {
			let t = await db.fetch(message.author.id + random);

			timePassed = Date.now() - t;
			timeLeft = time - timePassed;
		}, 5000);

		let int;
		let m = await message.reply({embeds: [embedG(timeLeft, message)]});

		int = setInterval(() => {
			m.edit({ embeds: [embedG(timeLeft, message) ]});
		}, 5000);

		setTimeout(async () => {
			clearInterval(int);
			clearInterval(i);
			m.edit({
				embeds: [{
					title: '⏲️ Timer Stopped!',
					color: 'RANDOM'
				}]
			});
      m.reply(`<@${message.author.id}> Timer Ended.`)
			await db.delete(message.author.id + random);
		}, time);
	}
};
function embedG(timeLeft, message) {
	let embed = new MessageEmbed()
		.setTitle('⏲️ Timer Started!')
		.setDescription(`>>> Time Left:** ${formatDuration(timeLeft)}**`)
		.setColor('RANDOM')
		.setFooter(message.author.username, message.author.displayAvatarURL());

	return embed;
}
function formatDuration(ms) {
	var duration = moment.duration(ms);
	if (duration.asHours() > 1) {
		return (
			Math.floor(duration.asHours()) +
			moment.utc(duration.asMilliseconds()).format(':mm:ss')
		);
	} else {
		return moment.utc(duration.asMilliseconds()).format('mm:ss');
	}
}
