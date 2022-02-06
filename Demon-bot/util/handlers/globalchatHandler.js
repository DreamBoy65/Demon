const Schema = require("../../models/guild")
const { Util } = require("discord.js")
const badwords = require('bad-words');
const filter = new badwords()
filter.addWords("xhamster", "xhamster")

module.exports = {
    handleGlobalchat: async function l(client, message) {
        if(!message.guild) return;

        try {
            let data = await Schema.findOne({id: message.guild.id})

            if(!data) return;

            if(message.channel.id !== data.globalChat) return;

            let msg = await Util.removeMentions(message.content.replace("everyone", "ever-one").replace("@here", "he-re"));
        
            if (msg.length > 1000) return message.error("You Cant send long msg.")

            if(filter.isProfane(msg)) return message.error("you cant send Nsfw word.")
            if(msg.match('/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi') !== null) return message.error("No Invites.")

            await message.delete()

            await client.guilds.cache.forEach(async guild => {
            let Data = await Schema.findOne({id: guild.id})

            if(!Data?.globalChat) return;

            await client.channels.cache.get(Data.globalChat)?.createWebhook(message.author.tag, {
    avatar: message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 128 })
  })
  .then(webhook => Promise.all([webhook.send(msg), webhook]))
  .then(([_, webhook]) => webhook.delete())
  .catch((e) => {console.log(e)});
                
          })
        } catch (e) {console.log(e)}
    }
}