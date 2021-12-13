const { Intents } = require("discord.js")

module.exports = {
  client: {
    presence: {
      activity: {
        name: "Demons 🎭 | $",
        type: "WATCHING"
      }, 
      status: "dnd"
    },
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
			],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    allowedMentions: {
      parse: ['users']
    },
  },

  prefix: "$",

  debug: false,

  database: {
    enable: true,
    uri: process.env.MONGODB,
    config: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4
    }
  },

  jsondb: {
    path: "./Demon-bot/database/json/jsondb.json"
  },

  owners: [
    "813299347819069520"
  ],

  apis: {
    AME_API: process.env.AME,
    TENOR: process.env.TENOR,
    perspective: process.env.PERSPECTIVE_API_KEY,
    
  },

  giveaway: {
    storage: './Demon-bot/database/json/giveaway.json',
    everyoneMention: false,
    hostedBy: true,
    botsCanWin: false,
    embedColor: "#ff0000",
    embedColorEnd: "#ff00ff",
    reaction: "🎊",
    countDown: "10000",
    giveawayEmoji: "🎊"
  }
}