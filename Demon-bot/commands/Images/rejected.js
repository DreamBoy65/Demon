const AmeClient = require('amethyste-api');
const Discord = require("discord.js")

module.exports = {
	name: "rejected",
category: "Images", 
  async execute(client, message, args){
const AmeAPI = new AmeClient(client.configg.AME_API);

   const user = message.mentions.users.first() || message.author;
   
        let m = await message.channel.send("Please Wait......");
        let buffer = await AmeAPI.generate("rejected", { url: user.displayAvatarURL({ format: "png", size: 2048 }) });
        let attachment = new Discord.MessageAttachment(buffer, "rejected.png");
        m.delete({ timeout: 5000 });
        message.channel.send({files: [attachment]});
	}
}