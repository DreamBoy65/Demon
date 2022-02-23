const ms = require("ms")

module.exports = {
	name: "giveaway-list",
	description: "show the list of giveaways in server",
	aliases: ['glist'],
  examples: ["glist"],
category: "Giveaway", 
	execute(client, message, args ){
const Discord = require("discord.js");
    let giveaways = []
    const giveaways1 = client.giveawaysManager.giveaways.filter((g) => g.guildID === message.guild.id)
    const giveaways2 = giveaways1.filter((g) => !g.ended)
    const giveaways3 = giveaways2.forEach((thisGiveaway)=>{
        let winners = ''
        if(thisGiveaway.winnerCount == 1){
            winners = 'winner'
        }else{
            winners = 'winners'
        }
        giveaways.push(`\`${thisGiveaway.messageID}\` | <#${thisGiveaway.channelID}> | **${thisGiveaway.winnerCount}** ${winners} | Prize: **${thisGiveaway.prize}** | [Giveaway Link](https://discord.com/channels/${message.guild.id}/${thisGiveaway.channelID}/${thisGiveaway.messageID})`)
    })
    const embed = new Discord.MessageEmbed()
    .setColor(client.configg.embedColor)
    .setTitle('Current Giveaways')
    .setDescription(giveaways.join('\n') || 'No giveaways are currently running')
    message.channel.send({embeds: [embed]})

	}
}