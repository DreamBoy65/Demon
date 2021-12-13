const { Schema, model } = require('mongoose');

module.exports = model(
	'anti-toxic',
	new Schema({
		Guild: String,
		Module: String, 
		Channel: String,
	})
);
