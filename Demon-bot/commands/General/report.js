const { MessageEmbed } = require("discord.js")
module.exports ={
	name: "report",
category: "General",
	description:"send a report to owner",
	 execute(client, message, args){
		const owner = client.channels.cache.get("842394029949714442")
		const query = args.join(" ")
		if(!query) return message.channel.send("<a:crosss:844939715816063024>Please specify a query")
		const rembed = new MessageEmbed()
		.setTitle("New bug found!")
		.addField("Author", message.author.tag.toString(), true)
		.addField("guild", message.guild.name, true)
		.addField("Query :-", query)
		.setColor("RANDOM")
.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
		.setTimestamp()
		owner.send({embeds: [rembed]})
		message.channel.send("report submitted successfully ✅")
	}
}