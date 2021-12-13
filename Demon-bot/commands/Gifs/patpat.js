const api = require('blueapi.js');
const discord = require('discord.js'); //Discord.js V12


module.exports = {
	name: "petpet",
category: "Gifs",
	execute: async(client,message, args) => {
		const b = await message.channel.send("Loading.....")
		const a = message.mentions.users.first() || message.author
let image = await api.image.petpet(a.displayAvatarURL({ dynamic: false, format: 'png' }), { frames: 10} );

        let file = new discord.MessageAttachment(image, "trigger.gif");

        message.channel.send({files: [file]}).then(() => {
        	b.delete()
        })
	}
}
        