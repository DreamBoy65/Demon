const { Database } = require('quickmongo');

class mongodb extends Database {
  constructor(client, database) {
    super(database.uri)

    this.client = client;
  }

  init() {
    this.client.logger.success("MONGO DB Manager Loaded.")
  }
}

module.exports = mongodb;