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
		tickets: {
            category: {
                type: String,
                default: null
            },
            channel: {
                type: String,
                default: null
            },
            msgId: {
                type: String,
                default: null
            },
            uses: {
                type: Number,
                default: 0
            },
            opened: {
                type: Array,
                default: []
            }
        },
		globalChat: {
		  type: String,
		  default: null
		},
        confess: {
            type: String,
            default: null
        },
        cno: {
            type: Number,
            default: 0
        },
        afk: {
          type: Array,
          default: []
        }
	})
);
