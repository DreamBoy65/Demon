const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

module.exports = mongoose.model(
	'Guild',
	new Schema({
		id: {
			type: String
		},
		boostMsg: {
			type: String,
			default: '{member} just boosted the server!'
		},
		boostChannel: {
			type: String,
			default: null
		},
		boostEmbed: {
			type: Boolean,
			default: false
		},
    unBoostMsg: {
			type: String,
			default: '{member} just unboosted the server!'
		},
    boostRoles: {
      type: Array,
      default: []
    },
		ticketParent: {
		  type: String,
		  default: null
		},
		ticketChannel: {
		  type: String,
		  default: null
		},
		ticketMsg: {
		  type: String,
		  default: null
		}, 
		globalChat: {
		  type: String,
		  default: null
		},
    afk: {
      type: Array,
      default: []
    }
	})
);
