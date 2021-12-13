const { MessageEmbed } = require("discord.js")

module.exports = {
	name: "ban",
    category: 'Mod',
	execute: async (client, message, args) =>{
let member = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(r => r.username.toLowerCase() === args.join(' ').toLocaleLowerCase())
      
    if(!message.member.permissions.has("BAN_MEMBERS")){
        message.channel.send("<a:crosss:844939715816063024> | You don't have **BAN_MEMBERS** permission to use this command!");
    }

    else{
        if(!member)
            return message.channel.send("<a:crosss:844939715816063024> | Please mention a valid member of this server");
        if(!member.bannable) 
            return message.channel.send("<a:crosss:844939715816063024> | I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
if(member.id === message.author.id) return message.channel.send("You can't ban yourself!")
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "No reason provided";
const m = await message.channel.send({embeds: [{
  title: `Would you really like to ban ${member}`
}]})
        const id = await client.function.verify(m, message.author, 10000)
  if(id === "YES"){


member.ban({reason: reason})
            .catch(error => message.channel.send(`<a:crosss:844939715816063024> | Sorry ${message.author} I couldn't ban the user`));
        
        const embed = new MessageEmbed()
        .setDescription(`${member.user.tag} was successfully Banned By ${message.author.tag}\nReason :- ${reason}`)
        message.channel.send({embeds: [embed]})
  }
  if(id === "NO"){
    m.delete()
  }
    }
	}
}