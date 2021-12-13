const { GiveawaysManager } = require('discord-giveaways');

class giveawayManager extends GiveawaysManager {
  constructor(client, options) {
    super(client, options)

    this.client = client;
  }

  init() {
    this.client.logger.success("Giveaway Manager Loaded.")
  }
}

module.exports = giveawayManager