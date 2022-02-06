const inviteRegex = /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(\.gg|(app)?\.com\/invite|\.me)\/([^ ]+)\/?/gi;
const botInvRegex = /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(app)\.com\/(api\/)?oauth2\/authorize\?([^ ]+)\/?/gi;
const config = require("../config/Config.js")
const Prefix = require("../models/prefix")

module.exports = {
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  formatDate: function (date) {
    return new Intl.DateTimeFormat('en-US').format(date);
  },

  getWrapText: function (text, length) {
    const temp = [];
    for (let i = 0; i < text.length; i += length) {
      temp.push(text.slice(i, i + length));
    }
    return temp.map(x => x.trim());
  },

  formatNumber(number, minimumFractionDigits = 0) {
    return Number.parseFloat(number).toLocaleString(undefined, {
      minimumFractionDigits,
      maximumFractionDigits: 2
    });
  },

  firstUpperCase(text, split = ' ') {
    return text.split(split).map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ');
  },

  shorten(text, maxLen = 2000) {
    return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
  },

  stripInvites(str, { guild = true, bot = true, text = '[redacted invite]' } = {}) {
    if (guild) str = str.replace(inviteRegex, text);
    if (bot) str = str.replace(botInvRegex, text);
    return str;
  },

  async getPrefix(message){
    let data = await Prefix.findOne({Guild: message.guild?.id})

    if (message.channel.type !== 'dm') {
			const prefixes = [
				`<@!${message.client.user.id}> `,
				`<@${message.client.user.id}> `,
				"demon",
				data?.Prefix,
                config.prefix
			];
			let prefix = null

			prefixes.forEach(p => {
				if (
					message.content.startsWith(p) ||
					message.content.toLowerCase().startsWith(p)
				) {
					prefix = p;
				}
			});
			return prefix;
		} else {
			return true;
		}
  },

  shuffle: function (array) {
    const arr = array.slice(0);
    for (let i = arr.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }
}