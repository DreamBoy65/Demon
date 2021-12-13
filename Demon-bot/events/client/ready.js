const chalk = require('chalk');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const ms = require('pretty-ms');
const moment = require('moment');
const timestamp = `${moment().format('DD-MM-YY H:m:s')} [UTC]`;

module.exports = async client => {
	try {
		setInterval(async () => {
			const emojis = [
				'😆',
				'😄',
				'😎',
				'😂',
				'🥳',
				'😘',
				'😜',
				'😁',
				'😉',
				'🥰',
				'😍',
				'🤯',
				'🥶',
				'🤩',
				'😇',
				'😊',
				'☺️',
				'😌',
				'😋'
			];
			const emoji = emojis[Math.floor(Math.random() * emojis.length)];
			var date = new Date()
				.toJSON()
				.slice(0, 10)
				.replace(/-/g, '/');
			const discordbday = new Date().getFullYear() + '/07/3';
			const statuslist = [];
			if (date == discordbday) {
				statuslist.push(
					`🎉 ${client.guilds.cache.size} servers 🎉`,
					`🎉 ${client.guilds.cache.reduce(
						(a, g) => a + g.memberCount,
						0
					)} members 🎉`,
					`🎉 Chat with me in Dms 🎉`,
					`🎉 My Birthday 🎂 🎉`
				);
			} else {
				statuslist.push(
					`${emoji} | ${client.guilds.cache.size} servers!`,
					`${emoji} | ${client.guilds.cache.reduce(
						(a, g) => a + g.memberCount,
						0
					)} members!`,
					`${emoji} | Chat with me in Dms!`,
				);
			}
const button1 = new MessageButton()
                   .setLabel("Invite")
                   .setStyle("LINK") .setURL("https://discord.com/api/oauth2/authorize?client_id=868131281307836467&permissions=8&scope=bot")
      
      
			const random = Math.floor(Math.random() * (statuslist.length - 1) + 1);
      client.user.setPresence({ activities: [{name: `$help | ${statuslist[random]}`, buttons: [button1], emoji: "☠"}], status: 'idle', type: "LISTENING"});
		}, 10000);
    

  
		const datelog = new Date();
		currentDate = datelog.getDate();
		month = datelog.getMonth() + 1;
		year = datelog.getFullYear();
		hour = datelog.getHours();
		min = datelog.getMinutes();
		sec = datelog.getSeconds();
		client.logger.success(
			'Generated at: ' +
				currentDate +
				'/' +
				month +
				'/' +
				year +
				' | ' +
				hour +
				':' +
				min +
				'.' +
				sec
		);
		client.logger.success(
			chalk.cyan('Logged in as ') +
				chalk.blueBright.underline(`${client.user.username}!`))
				
				client.logger.success(chalk.cyan('Serving on ') +
				chalk.blueBright.underline(client.guilds.cache.size) +
				chalk.cyan(' Servers!') +
				chalk.cyan(' With ') +
				chalk.blueBright.underline(client.users.cache.size) +
				chalk.cyan(' users')
		); // ${client.user.tag
	} catch (e) {
		console.log(e);
	}
};
