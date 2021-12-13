const axios = require("axios");

module.exports = {
name: "djsdocs",
aliases: ["djs", "docs"],
category: "Search",
args: true,
permission: "",
cooldown: 5,
description: "Shows doc's from discord.js",
usage: "djsdocs <query>",

async execute(bot, message, args){

 const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      args
    )}`

    axios
      .get(uri)
      .then((embed) => {
        const { data } = embed

        if (data && !data.error) {
          message.channel.send({ embeds: [data] })
        } else {
          message.reply('Could not find that documentation')
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
