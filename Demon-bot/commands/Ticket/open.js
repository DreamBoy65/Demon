const db = require("old-wio.db")
const { MessageEmbed } = require("discord.js")
module.exports = {
	name: 'open-ticket',
	description: 'open the ticket',
	category: 'Ticket',
	execute: async (client, message, args) => {
	  if(db.has(message.author.username)) return message.Reply("You already have a open ticket!")
	  
		let parent = await message.guild.channels.cache.get(
			client.data.ticketParent
		);
		if (!parent) parent = null

		message.guild.channels
			.create(message.author.username, {
				parent: parent,
				permissionOverwrites: [
					{
						id: message.guild.id,
						deny: ['VIEW_CHANNEL']
					},
					{
						id: message.author.id,
						allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
					}
				]
			})
			.then(async channel => {
				db.set(message.author.username, 'Opened');
				const msg = await channel.send(
					`<@${message.author.id}> Welcome!`,
          {embeds: [new MessageEmbed()
						.setColor('RANDOM')
						.setTitle('Welcome To Your Ticket')
						.setDescription('Please Provide Your Issues')
						.setTimestamp()
						.setFooter(`Ticket For ${message.author.username}#${message.author.discriminator}`)
				]});
				await msg.react('❌');
				db.set('msgid', msg.id);
message.Reply(`opening.. Ticket!\n<#${channel.id}>`)
			})
	}
};
