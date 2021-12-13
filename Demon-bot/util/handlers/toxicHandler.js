const Schema = require("../../models/anti-toxic")
const Perspective = require("perspective-api-client")


module.exports = {
    handleToxic: async function(client, message) {
        if(!message.guild) return;
        
        let data = await Schema.findOne({Guild: message.guild.id})

        if(!data) return;
 
        if(!message.content) return;

        if(data.Module === "true") {
            try {
                const perspective = new Perspective({apiKey: client.config.apis.perspective})

                let result = await perspective.analyze(message.content.toLowerCase())
                let obj = JSON.parse(JSON.stringify(result))
                    
                let fp = Math.ceil(obj.attributeScores.TOXICITY.summaryScore.value * 100)

                if(fp > 85) {
                    await message.delete()

                    await message.guild.channels.cache.get(data.Channel).send({embeds: [{
                        title: "Anti-Toxic Module-",
                        description: `**Message sent by ${message.author.tag} deleted in ${message.channel} because it contains ${fp}% Toxicity.\n\nMessage : ${message.content}**`,
                        color: "RANDOM", 
                        timestamp: new Date(),
                        thumbnail: {
                            url: message.member.user.displayAvatarURL()
                    }
                  }]})
                }
                
            } catch {}
        }
    }
}