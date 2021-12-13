const Schema = require("../../models/chatbot-channel")
const fetch = require("node-fetch")

module.exports = {
    handleChatbot: async function(client, message) {
        if(message.guild) {
            
            let data = await Schema.findOne({Guild: message.guild.id})

            if(!data) return;

            if(message.channel.id !== data.Channel) return;

            let webhooks = await message.channel.fetchWebhooks()


            let webhook = webhooks.find(c => c.name === "DEMON-CHAT-BOT")

            if(!webhook) {
                webhook = await message.channel.createWebhook("DEMON-CHAT-BOT", {
                    avatar: client.user.displayAvatarURL()
                })
            }
            
            await webhook.edit({
                name: data.name ? data.name : "Demon.",
                avatar: data.av ? data.av : client.user.displayAvatarURL()
            })

            let chat = await fetch(`http://api.brainshop.ai/get?bid=157869&key=h0PX1NOYuGTdDCY3&uid=1&msg=${encodeURIComponent(message.content)}`).then(res => res.json())
            
            await webhook.send({content: chat.cnt})

            return await webhook.edit({
                name: "DEMON-CHAT-BOT", 
                avatar: client.user.displayAvatarURL()
            })
        } else {
            
            let chat = await fetch(`http://api.brainshop.ai/get?bid=157869&key=h0PX1NOYuGTdDCY3&uid=1&msg=${encodeURIComponent(message.content)}`).then(res => res.json())

            message.reply(chat.cnt)
        }
    }
}