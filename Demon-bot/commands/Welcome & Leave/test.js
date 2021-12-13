const commands = ['welcome', 'leave'];
const { Database } = require('quickmongo');
const db = new Database(process.env.MONGODB);
const canvas = require('discord-canvas');
const Discord = require('discord.js');

module.exports = {
	name: 'wl-test',
	description: 'test welcome or leave msg!',
	category: 'Welcome',
	usage: 'welcome/leave',
	execute: async (client, message, args) => {
    
    
if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send("You need Manage_server perms to execute this cmd.")

		const command = args[0];

		if (!commands.includes(command))
			return message.channel.send('**Option must be in welcome or leave**!');

		if (command === 'welcome') {
			try {
				client.emit('guildMemberAdd', message.member);
				message.Reply("Done!")
			} catch (e) {
				console.log(e);
			}
		}

		if (command === 'leave') {
			try {
				client.emit('guildMemberRemove', message.member);
				message.Reply("Done!")
			} catch (e) {
				console.log(e);
			}
		}
	}
};
