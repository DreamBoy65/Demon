const {MessageEmbed}=require("discord.js")
const glob = require("glob")

module.exports = {
  name: "reload",
  category: "Owner",
  description: "reload all cmds",
  ownerOnly: true,
  execute: async(client, message, args) =>{
     
    client.commands.sweep(() => true)
    
    glob(`${__dirname}/../**/*.js`, async (err, filePaths) =>{
      if(err) return console.log(err)
      
      filePaths.forEach((file) => {
        delete require.cache[require.resolve(file)]
        
        const pull = require(file)
        
        if(pull.name){
          console.log(`Reloded Cmd : ${pull.name}`)
          client.commands.set(pull.name, pull)
        }
      })
    })
    message.channel.send({embeds: [new MessageEmbed()
    .setTitle("Bot Reloaded")
    .setDescription("Bot Reloaded Successfully")
    .setTimestamp()
    .setColor("RANDOM")
    .setThumbnail(message.author.displayAvatarURL())
    ]})
  }
}