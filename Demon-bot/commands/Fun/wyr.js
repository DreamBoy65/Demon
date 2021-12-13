const {WouldYouRather} = require("weky")

module.exports = {
  name: "wouldyourather",
  aliases: ["wyr"],
  category: "fun",
  description: "wouldyourather",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["wyr"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  execute: async(client, message, args) => {
    try {
        
      await WouldYouRather({
	message: message,
	embed: {
		title: 'Would you rather...',
		color: '#5865F2',
        footer: 'Demon | King',
		timestamp: true
	},
	thinkMessage: 'I am thinking',
	othersMessage: 'Only <@{{author}}> can use the buttons!',
	buttons: { optionA: 'Option A', optionB: 'Option B' }
      });
        
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}