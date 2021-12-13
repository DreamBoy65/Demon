const { Database } = require('quickmongo');
const db = new Database(process.env.MONGODB);
module.exports = {
	name: 'set-leave-channel',
	description: 'set the leave channel or remove by **$set-leave-channel remove**',
category: "Welcome",
	usage: '<channel>',
	execute: async (client, message, args) => {
		if (!message.member.permissions.has('MANAGE_GUILD'))
			return message.channel.send({
				embeds: [{
					color: "RANDOM",
					title: `You do not have the required Permissions! - [MANAGE_GUILD] `
				}]
			});
if (!args[0]) {
  let b = await db.fetch(`leave-channel_${message.guild.id}`);
  let channelName = message.guild.channels.cache.get(b);
  if (message.guild.channels.cache.has(b)) {
    return message.channel.send(
      `**Leave Channel Set In This Server Is \`${channelName.name}\`!**`
    );
  } else
    return message.channel.send({embeds: [{
            color: "RANDOM",
            title: `Please Enter a Channel or Channel ID to set or type remove to remove `
        }]})
}
if(args[0] === "remove"){
db.delete(`leave-channel_${message.guild.id}`).catch(() => {
    message.channel.send("**Channel is not setup yet!**")
})
return message.channel.send("**leave Channel Removed**!")
    }
		let channel =
			message.mentions.channels.first() ||
			client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
			message.guild.channels.cache.find(
				c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase()
			);

		if (!channel || channel.type !== 'GUILD_TEXT')
			return message.channel.send({
				embeds: [{
					color: 'RANDOM',
					title: `Please Enter a Valid Text Channel`
				}]
			});
			
try {
        let a = await db.fetch(`leave-channel_${message.guild.id}`)

        if (channel.id === a) {
            return message.channel.send({embeds: [{
            color: "RANDOM",
            title: `This Channel is already set as Leave Channel!`
        }]})
        } else {
            client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send(`**Leave Channel Set!**`)
            db.set(`leave-channel_${message.guild.id}`, channel.id)

           message.channel.send({embeds: [{
            color: "RANDOM",
            title: `Leave Channel has been Set Successfully \`${channel}\``
        }]})
        }
    } catch {
        return message.channel.send(`**Error - Missing Permissions Or Channel Is Not A Text Channel!**`);
    }

	}
};
