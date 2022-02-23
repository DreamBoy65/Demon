const Discord = require('discord.js');
const ms = require('ms');
const { Database } = require('quickmongo');
const db = new Database(process.env.MONGODB);

module.exports = {
	name: 'ping',
	aliases: ['pong', 'pinged'],
	description: 'Show client ping',
	category: 'General',
	usage: 'ping',
  examples: ["ping"],
	execute: async (client, message, args) => {
		const dbping = await db.ping();
		try {
			const m= await message.reply({
				embeds: [{
					color: 3447003,
					description: ':ping_pong: Pinging...'
				}]
			});

			const ping = new Discord.MessageEmbed() // Prettier()
				.setTitle(':ping_pong: Pong!')
				.addField(
					'My ping: ',
					`${Math.floor(m.createdTimestamp - message.createdTimestamp)} ms`
				)
				.addField('API ping (Websocket): ', `${Math.round(client.ws.ping)} ms`)
				.addField('DB Ping:', ms(dbping.average))
				.addField(
					'Note:',
					'These results may not be accurate and may be different from actual ping.'
				)
				.setFooter(
					`Requested by ${message.author.username}`,
					message.author.displayAvatarURL({
						dynamic: true,
						format: 'png',
						size: 2048
					})
				)
				.setColor('RANDOM')
				.setTimestamp();

			message.reply({embeds: [ping]}).then(() => {
			  m.delete()
			})
			
		} catch (err) {
			message.reply({
				embeds: [{
					color: 16734039,
					description: 'Something went wrong... :cry:'
				}]
			});
			console.log(err);
		}
	}
};
