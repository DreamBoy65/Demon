const AmeClient = require('amethyste-api');
const Discord = require("discord.js")

module.exports = {
	name: "scary",
category: "Images", 
	description: "Yo Scare Your friends", 
  async execute(client, message, args){
const AmeAPI = new AmeClient(client.configg.AME_API);

   const user = message.mentions.users.first() || message.author;
   
        let m = await message.channel.send("**Please Wait...**");
        let buffer = await AmeAPI.generate("scary", { url: user.displayAvatarURL({ format: "png", size: 2048 }) });
        let attachment = new Discord.MessageAttachment(buffer, "scary.png");
        m.delete({ timeout: 5000 });
        message.channel.send({files: [attachment]});
	}
}