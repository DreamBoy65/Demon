const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const signs = {
  cancer: '♋',
  aquarius: '♒',
  aries: '♈',
  taurus: '♉',
  virgo: '♍',
  scorpio: '♏',
  libra: '♎',
  gemini: '♊',
  leo: '♌',
  sagittarius: '♐',
  capricorn: '♑',
  pisces: '♓'
};

module.exports = {
  name: "horoscope",
  aliases: [],
  category: "fun",
  description: "get horoscope for your sign.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["horoscope gemini"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  execute: async(client, message, args) => {
    try {

        let sign = args[0]

        if(!sign) sign = "gemini"

        if(!Object.keys(signs).includes(sign)) return message.error("Enter a valid sign *baka*")

        const data = await fetch(`http://sandipbgt.com/theastrologer/api/horoscope/${sign}/today`)
    .then(res => res.json())
    .catch(() => null);

        if(!data) return message.error("Server down sry.")

        message.send(data.horoscope.replace('(c) Kelli Fox, The Astrologer, http://new.theastrologer.com', ''), {
            title: signs[sign.toLowerCase()] + ' ' + data.sunsign || sign,
            fields: [
        { name: '> Mood', inline: true, value: data.meta.mood || '\u200b' },
        { name: '> Intensity', inline: true, value: data.meta.intensity || '\u200b' },
        { name: '> Keywords', inline: true, value: data.meta.keywords || '\u200b' }
      ]
        })
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}