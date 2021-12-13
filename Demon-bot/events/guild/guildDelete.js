const prefixSchema = require('../../models/prefix')

module.exports = async(client, guild) => {
  if(!guild.name) return;
  
const logs = client.channels.cache.get('839574981922783262');
	const { MessageEmbed } = require('discord.js');
	const message = guild;
	const embed = new MessageEmbed()
		.setTitle('Guild Deleted!')
		.setDescription(
			`**Guild** :- ${guild.name}\n**Members** :- ${
				guild.memberCount
			}\nNow I'm in :- ${client.guilds.cache.size}`
		)
		.setColor('#ff0000')
		.setThumbnail(guild.iconURL())
		.setTimestamp();
	logs.send({embeds: [embed]});
	//Prefix 
prefixSchema.findOne({ Guild: guild.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            prefixSchema.findOneAndDelete({ Guild : guild.id }).then(console.log('deleted data.'))
        }
    })
}