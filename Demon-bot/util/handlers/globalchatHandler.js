const Schema = require("../../models/guild")
const { Util } = require("discord.js")

module.exports = {
    handleGlobalchat: async function l(client, message) {
        if(!message.guild) return;

        try {
            let data = await Schema.findOne({id: message.guild.id})

            if(!data) return;

            if(message.channel.id !== data.globalChat) return;

            let msg = Util.removeMentions(message.content.replace("everyone", "ever-one").replace("@here", "he-re"));
        
            if (msg > 1000) return;

            if (msg.match(/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi) !== null) return;

            await message.delete()

            await client.guilds.cache.forEach(async guild => {
            let Data = await Schema.findOne({id: guild.id})

            if(!Data?.globalChat) return;

            let channel = await client.guilds.cache.get(guild.id).channels.cache.get(Data.globalChat)
            
            let webhook = await channel.createWebhook(message.author.tag, {
                    avatar: message.author.displayAvatarURL()
                })

            await webhook.send({content: msg})

            return webhook.delete()
          })
        } catch {}
    }
}