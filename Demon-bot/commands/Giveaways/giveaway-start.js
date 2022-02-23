const ms = require('ms');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'giveaway-start',
	aliases: ['gstart'],
	description: 'start a giveaway in server',
  examples: ["gstart #Giveaways 1d 1 Fake Nitro !!"],
category: "Giveaway", 
	async execute(client, message, args){

    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if(!giveawayChannel){
        return message.channel.send(':x: You have to mention a valid channel!\nFormat:- \`$gstart [channel] [time] [winners] [prize]\`');
    }

    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(':x: You have to specify a valid duration!\nFormat:- \`$gstart [channel] [time] [winners] [prize]\`');
    }

    // Number of winners
    let giveawayNumberWinners = args[2];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(':x: You have to specify a valid number of winners!\nFormat:- \`$gstart [channel] [time] [winners] [prize]');
    }else
    if(giveawayNumberWinners > 10){
        return message.channel.send(':x: You must have less than 10 winners!\nFormat:- \`$gstart [channel] [time] [winners]\`');
    }

    // Giveaway prize
    let giveawayPrize = args.slice(3).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send(':x: You have to specify a valid prize!\nFormat:- \`$gstart [channel] [time] [winners] [prize]\`');
    }

    // Start the giveaway
    
    client.giveawaysManager.start(giveawayChannel, {
        // The giveaway duration
        duration: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: parseInt(giveawayNumberWinners),
        // Who hosts this giveaway
        hostedBy: client.config.giveaway.hostedBy ? message.author.tag : null,
        // Messages
        messages: {
            giveaway: (client.config.giveaway.everyoneMention ? "@everyone\n\n" : "")+ client.config.giveaway.giveawayEmoji + "** GIVEAWAY **" + client.config.giveaway.giveawayEmoji,
            giveawayEnded: (client.config.giveaway.everyoneMention ? "@everyone\n\n" : "")+ client.config.giveaway.giveawayEmoji + "** GIVEAWAY ENDED **" + client.config.giveaway.giveawayEmoji,
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "React with " + client.config.giveaway.giveawayEmoji + " to participate!",
            winMessage: client.config.giveaway.giveawayEmoji + " {winners} won **{this.prize}**!",
            embedFooter: "Demon",
            noWinner: "Giveaway cancelled, no valid participations.",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    message.channel.send(`${client.configg.giveawayEmoji} Giveaway started in <#${giveawayChannel.id}>`);


	}
};
