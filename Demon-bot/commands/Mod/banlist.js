const { MessageEmbed } = require("discord.js")
module.exports = {
	name: "banlist",
	description: "list of ban members in server", 
category: 'Mod',
	execute: async (client, message, args) =>{
		if(!message.member.permissions.has("BAN_MEMBERS" || "MANAGE_SERVER")) return message.channel.send("<a:crosss:844939715816063024> | You need **BAN_MEMBERS , MANAGE_SERVER ** Permisson to use this command")
  
  
  message.guild.bans.fetch()
  .then(banned => {
    let list = banned.map(user => user.user.tag).join('\n');

    // Make sure if the list is too long to fit in one message, you cut it off appropriately.
    if (list.length >= 1950) list = `${list.slice(0, 1948)}...`;

    const embed = new MessageEmbed()
		.setTitle("Ban List")
		.setColor("RANDOM")
		.setDescription(`Total Bans :- ${banned.size}\nUsers:\n${list}` || "None")
		.setTimestamp()
		message.channel.send({embeds: [embed]})
  })
  .catch((e) => {
    message.channel.send({embeds:[{
      title: e.message
    }]})
  })
		
	}
}