const memes = require("random-memes");

module.exports = {
    handleMemes: async function(client, message) {
        if(!message.guild) return;
        
        let channel = client.channels.cache.get(await client.mongo.fetch(`meme-channel_${message.guild.id}`))

        if(!channel) return;

        let meme = await memes.random()

        channel.send({embeds: [
            {
                title: meme.caption,
                image: {
                    url: meme.image
                },
                color: "RANDOM", 
                timestamp: new Date(),
                footer: {
                    text: `\©️${new Date().getFullYear()} - Demon`
                }
            }
        ]})
    }
}