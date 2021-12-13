const ms = require('ms');
module.exports = {
	name: 'giveaway-create',
	aliases: ['gcreate'],
	category: "Giveaway", 
	description: 'creates a giveaway',
	async execute(client, message, args) {
		let giveawayChannel = '';
		let giveawayDuration = '';
		let giveawayNumberWinners = '';
		let giveawayPrize = '';
		let status = '';

		// If the member doesn't have enough permissions

		// Giveaway channel
		async function part1() {
			await message.channel.send(
				`>>> ${
					client.config.giveaway.giveawayEmoji
				} Please mention the channel that the giveaway should be in.\nEnter \`cancel\` to cancel.`
			);
      let filter = m => m.author.id === message.author.id;
			await message.channel
				.awaitMessages({
          filter, 
					max: 1,
					time: 1800000
				})
				.then(collected => {
					if (collected.first().content.toLowerCase() == 'cancel') {
						message.channel.send('**Command Canceled**');
						status = 1;
						return;
					} else {
						giveawayChannel = collected.first().mentions.channels.first();
						if (!giveawayChannel) {
							message.reply(
								'No channel was mentioned\nPlease try the command again.'
							);
							status = 1;
						}
					}
				})
				.catch(() => {
					message.reply(
						'No answer after 30 minutes, please try the command again.'
					);
					status = 1;
				});
		}

		// Giveaway duration
		async function part2() {
			await message.channel.send(
				`>>> ${
					client.config.giveaway.giveawayEmoji
				} How long should the giveaway last?\nEnter \`cancel\` to cancel.`
			);
			await message.channel
				.awaitMessages(m => m.author.id == message.author.id, {
					max: 1,
					time: 1800000
				})
				.then(collected => {
					if (collected.first().content.toLowerCase() == 'cancel') {
						message.channel.send('**Command Canceled**');
						status = 1;
						return;
					} else if (isNaN(ms(collected.first().content.toLowerCase()))) {
						message.channel.send(':x: You have to specify a valid duration!');
						status = 1;
						return;
					} else {
						giveawayDuration = collected.first().content;
					}
				})
				.catch(() => {
					message.reply(
						'No answer after 30 minutes, please try the command again.'
					);
					status = 1;
				});
		}

		// Number of winners
		async function part3() {
			await message.channel.send(
				`>>> ${
					client.config.giveaway.giveawayEmoji
				} How many winners should there be?\n**Max 10**\nEnter \`cancel\` to cancel.`
			);
			await message.channel
				.awaitMessages(m => m.author.id == message.author.id, {
					max: 1,
					time: 1800000
				})
				.then(collected => {
					if (collected.first().content.toLowerCase() == 'cancel') {
						message.channel.send('**Command Canceled**');
						status = 1;
						return;
					} else if (
						isNaN(collected.first().content.toLowerCase())
					) {
						message.channel.send(
							':x: You have to specify a valid number of winners!'
						);
						status = 1;
						return;
					} else if (collected.first().content.toLowerCase() > 10) {
						message.channel.send(':x: You must have less than 10 winners!');
						status = 1;
						return;
					} else {
						giveawayNumberWinners = parseInt(collected.first().content)
					}
				})
				.catch(() => {
					message.reply(
						'No answer after 30 minutes, please try the command again.'
					);
					status = 1;
				});
		}

		// Giveaway prize
		async function part4() {
			await message.channel.send(
				`>>> ${
					client.config.giveaway.giveawayEmoji
				} What should the giveaway prize be?\nEnter \`cancel\` to cancel.`
			);
			await message.channel
				.awaitMessages(m => m.author.id == message.author.id, {
					max: 1,
					time: 1800000
				})
				.then(collected => {
					if (collected.first().content.toLowerCase() == 'cancel') {
						message.channel.send('**Command Canceled**');
						status = 1;
						return;
					} else {
						giveawayPrize = collected.first().content;
					}
				})
				.catch(() => {
					message.reply(
						'No answer after 30 minutes, please try the command again.'
					);
					status = 1;
				});
		}

		// Start the giveaway
		async function part5() {
			client.giveawaysManager.start(giveawayChannel, {
				// The giveaway duration
				time: ms(giveawayDuration),
				// The giveaway prize
				prize: `Prize :- ${giveawayPrize}`,
				// The giveaway winner count
				winnerCount: giveawayNumberWinners,
				// Who hosts this giveaway
				hostedBy: client.config.giveaway.hostedBy ? message.author : null,
				// Messages
				messages: {
					giveaway:
						(client.config.giveaway.everyoneMention ? '@everyone\n\n' : '') +
						client.config.giveaway.giveawayEmoji +
						' **GIVEAWAY** ' +
						client.config.giveaway.giveawayEmoji,
					giveawayEnded:
						(client.config.giveaway.everyoneMention ? '@everyone\n\n' : '') +
						client.config.giveaway.giveawayEmoji +
						'** GIVEAWAY ENDED **' +
						client.config.giveaway.giveawayEmoji,
					timeRemaining: 'Time remaining: **{duration}**!',
					inviteToParticipate:
						'React with ' + client.configg.giveawayEmoji + ' to participate!',
					winMessage:
						client.config.giveaway.giveawayEmoji + ' {winners} won **{prize}**!',
					embedFooter: 'Demon :-',
					noWinner: 'Giveaway cancelled, no valid participations.',
					hostedBy: 'Hosted by: {user}',
					winners: 'winner(s)',
					endedAt: 'Ended at',
					units: {
						seconds: 'seconds',
						minutes: 'minutes',
						hours: 'hours',
						days: 'days',
						pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
					}
				}
			});

			message.channel.send(
				`${client.configg.giveawayEmoji} Giveaway started in <#${
					giveawayChannel.id
				}>`
			);
		}

		async function main() {
			await part1();
			if (status) return;
			await part2();
			if (status) return;
			await part3();
			if (status) return;
			await part4();
			if (status) return;
			await part5();
		}

		main();
	}
};
