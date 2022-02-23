const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const Schema = require("../../models/guild")
module.exports = {
  name: "confess",
  aliases: [],
  category: "General",
  description: "confess something",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS", "MANAGE_MESSAGES"],
  memberPermissions: [],
  examples: ["confess this server sucks"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  execute: async(client, message, args) => {
    try {
        if(message.guild) return message.error("You can only confess in my dms.")
        if(!args?.length) return message.error("Where is Confession?")

        let guilds = []

        
        client.guilds.cache.map(async guild => {
            let mem = await guild.members.fetch(message.author.id).catch(() => null)

            if(mem) {                guilds.push(guild)
            }
        })


        await client.functions.delay(5000)
        
 
        let buttons = []
        let rows = []
        
                       for(const g of guilds) {
            let button = new MessageButton()
            .setLabel(g.name)
            .setStyle("PRIMARY")
            .setCustomId(g.id)

            buttons.push(button)
        }

        		for (let i = 0; i < Math.ceil(guilds.length / 5); i++) {
			rows.push(new MessageActionRow());
		}
		rows.forEach((row, i) => {
			row.addComponents(buttons.slice(0 + (i * 5), 5 + (i * 5)));
		});

      let msg = await message.channel.send({content: "Select guild where you want to send Confession.", components: rows})

      await msg.awaitMessageComponent({ componentType: "BUTTON", time: 30000}).then(async i => {
          
          let data = await Schema.findOne({id: i.customId})
          
          if(!data || !data.confess) return i.reply("That guild doesn't have confess channel.")
          
          let channel = client.channels.cache.get(data.confess)

        if(!channel) return message.error("Server is not setup yet!")

          data.cno = data.cno + 1
          await data.save()        
       channel.send({embeds: [
           {
               author: {
                   name: `Confession #${data.cno}`,
                   icon_url: client.guilds.cache.get(i.customId).iconURL({dynamic: true})

               },
               description: args.join(" "),
               footer: {
                   text: "Anonymous",
                   icon_url: "https://pm1.narvii.com/7886/fbd656436ce132c816d484ca284315c134d24b35r1-400-400v2_00.jpg"
               },
               timestamp: new Date(),
               color: "RANDOM"
           }
       ]})

          i.reply("Done!")
          
      }).catch(() => null)       

    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}
function randomNo() {
    return Math.floor(3000 + Math.random() * 3000)
}