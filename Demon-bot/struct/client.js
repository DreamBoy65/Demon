const { Client, Collection, Intents } = require("discord.js")
const Mongoose = require(`./mongoose`)
const giveawayManager = require("./giveawayManager")
const processEvents = require("../util/processEvents")
const json = require("./jsondb")
const mongodb = require("./mongodb")

class Bot extends Client {
  constructor (config) {
    super(config.client)

    this.commands = new Collection()
    this.aliases = new Collection()
    this.snipes = new Collection()

    this.config = config
    this.functions = require(`${process.cwd()}/Demon-bot/util/functions`)
    this.logger = require(`${process.cwd()}/Demon-bot/util/logger`)
    this.database = new Mongoose(this, config.database)
    this.giveawaysManager = new giveawayManager(this, config.giveaway)
    this.emoji = require("../config/Emoji")
    this.resolvers = require(`${process.cwd()}/Demon-bot/util/helpers/resolvers`)
    this.collector = require(`${process.cwd()}/Demon-bot/util/helpers/collector`)
    this.json = new json(this, config.jsondb.path)
    this.mongo = new mongodb(this, config.database)
 
    require(`${process.cwd()}/Demon-bot/util/helpers/extenders`)
  }

  init() {
     require('events').EventEmitter.prototype._maxListeners = 70;

require('events').defaultMaxListeners = 70;

['command', 'event'].forEach(handler => {
	require(`${process.cwd()}/Demon-bot/util/handlers/${handler}`)(this);
});

    this.database?.init()
    this.giveawaysManager?.init()
    this.json?.init()
    this.mongo?.init()
    
    this.login(process.env.TOKEN)
  }

  listentoProcessEvents(events = [], config = {}){
    if (!Array.isArray(events)){
      return;
    };

    if (typeof config !== 'object'){
      config = {};
    };

    for (const event of events){
      process.on(event, (...args) => {
        if (config.ignore && typeof config.ignore === 'boolean'){
          return;
        } else {
          return processEvents(event, args, this);
        };
      });
    };
  };
}

module.exports = Bot