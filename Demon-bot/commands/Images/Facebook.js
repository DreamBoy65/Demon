const AmeClient = require('amethyste-api');
const Discord = require("discord.js")

module.exports = {
	name: "facebook",
category: "Images", 
  async execute(client, message, args){
const AmeAPI = new AmeClient(client.configg.AME_API);

   const user = message.mentions.users.first() || message.author;
   const a = args.join(" ")
   if(!a) return message.channel.send("please specify your text\nFormat :- $facebook [message] [user/author]")
        let m = await message.channel.send("Please Wait......");
        let buffer = await AmeAPI.generate("facebook", { url: user.displayAvatarURL({ format: "png", size: 2048 }), text: a })
        let attachment = new Discord.MessageAttachment(buffer, "facebook.png");
        m.delete({ timeout: 5000 });
        message.channel.send({files: [attachment]});
	}
}