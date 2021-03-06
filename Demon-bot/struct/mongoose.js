const mongoose = require('mongoose');
const logger = require(`${process.cwd()}/Demon-bot/util/logger`)
module.exports = class Mongoose {
  constructor(client, options = {}) {

    /**
     * The client that instantiated this
     * @name Mongoose#client
     * @type {Client}
     * @readonly
     */
    Object.defineProperty(this, 'client', { value: client })

    /**
     * The connection URI for this instance
     * @type {string}
     */

      this.connector = options.uri;

    /**
     * The connection settings for this instance
     * @type {object}
     */
    this.settings = options.config;

    /**
     * instance of mongoose library
     * @type {object}
     */
    this.db = mongoose;

    /**
     * whether the client is connected to the database
     * @type {string}
     */
    this.connected = false;

    // Listen to event to set connected to true or false
    this.db.connection.on('connected', () => this.connected = true);
    this.db.connection.on('disconnect', () => this.connected = false);
  }

  /**
   * Initialize this database
   * @returns {Object<Database>}
   */
  init(client){

    this.db.connect(this.connector, this.settings).catch((error) => {
      logger.error(error.message, "db");
    });

    this.db.set('useFindAndModify',false)
    this.db.Promise = global.Promise;

    this.db.connection.on('connected', () => logger.success('Connected to MongoDB!'));

    return this.db;
  };
};