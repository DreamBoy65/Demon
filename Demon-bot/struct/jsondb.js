let jsoning = require("jsoning");

class json extends jsoning {
  constructor(client, path) {
    super(`${path}`)

    this.client = client;
  }

  init() {
    this.client.logger.success("JSON DB Manager Loaded.")
  }
}

module.exports = json;