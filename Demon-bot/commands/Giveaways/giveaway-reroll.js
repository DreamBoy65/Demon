const ms = require("ms")

module.exports = {
	name: "giveaway-reroll",
	description: "to reroll the winner of giveaway",
	aliases: ['greroll'],
  examples: ["greroll <msg_id>"],
category: "Giveaway", 
	async execute (client, message, args){

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.channel.send(':x: You have to specify a valid message ID!');
    }

    // try to found the giveaway with prize then with ID
    let giveaway = await client.giveawaysManager.giveaways.map(c => c).find((g) => g.messageId === args.join(" "));

    // If no giveaway was found
    if(!giveaway){
        message.channel.send(`:x: No giveaway found for \`${args.join(" ")}\`, please check you have the right message and try again.`);
    }

    // Reroll the giveaway
console.log(giveaway)
    client.giveawaysManager.reroll(giveaway.messageId, {
        messages: {
            congrat: client.configg.giveawayEmoji + 'New winner(s) : {winners}! Congratulations!'
        }
    })
    .then(() => {
        // Success message
        message.channel.send('✅ Giveaway rerolled!');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
            message.channel.send('This giveaway is not ended!');
        } else {
            console.error(e);
            message.channel.send(':x: There was an error');
        }
	})
	}
}