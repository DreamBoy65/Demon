const Discord = require("discord.js")
const Schema = require("../../models/guild")
const modifier = require("../../util/modify")
module.exports = async (client, member) => {
let data = await Schema.findOne({id: member.guild.id})
  
  if(!data) return;

  data.boostRoles.forEach(r => {
    member.roles.remove(r?.role)
  })
  
	const logs = client.channels.cache.get(data.boostChannel);
	if (!logs) return;

	if (data.boostEmbed) {
		const embed = new Discord.MessageEmbed()
			.setTitle(`${client.emoji.unboost} Server UnBoosted! ${client.emoji.unboost}`)
			.setDescription(await modifier.modify(data.unBoostMsg, member))
			.setColor('RANDOM')
			.setTimestamp();
		logs.send({content: `<@${member.user.id}>`, embeds: [embed]});
	} else {

		logs.send(await modifier.modify(data.unBoostMsg, member));
	}
};
