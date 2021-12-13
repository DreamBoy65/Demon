const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');
const didYouMean = require("didyoumean")
const {readdirSync} = require("fs")
const Images = require("discord-images")
const images = new Images.Client()
const Pages = require("../../util/helpers/pages")
const { pagesCollector } = require("../../util/helpers/collector")
const _ = require("lodash")

module.exports = {
  name: "help",
  aliases: ["h", "commands"],
  category: "General",
  description: "Help Command!",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["help"],
  cooldown: {
    time: 5000
  },
  nsfw: false,
  guildOnly: false,
  execute: (client, message, args) => {
   try{
     if(args[0]){
     let commands = []    

client.commands.map(c => commands.push(c.name))

     const command = args[0]
     let cmd = client.commands.get(command)

     let dum = didYouMean(command, commands)

     if(!cmd) return message.error(dum ? "That command does not exist OwO\nDid You Mean **"+dum+"** ?" : "That command does not exist OwO")

     const embed = new MessageEmbed()
     .setTitle("Help Command ? • " + command)
     .setDescription("Command information.")
     .addField(`**__Name__**`, `>>> • ${cmd.name}`)
     .addField(`**__Description__**`, cmd.description ? ">>> • " + cmd.description : ">>> Not Provided.")
     .addField("**__Aliases__**", cmd.aliases.length ? ">>> • " + cmd.aliases.join(" , ") : ">>> • Not Provided")
     .addField("**__Group__**", cmd.group ? ">>> • " + cmd.group : ">>> • Not Provided.")
     .addField("**__Examples__**", cmd.examples.length ? ">>> • " + cmd.examples.join("\n") : ">>> • Not Provided.")
     .addField("**__Parameters__**", cmd.parameters.length ? cmd.parameters.join("\n") : ">>> • Not Provided.")
     .addField("**__Guild Only__**", cmd.guildOnly ? ">>> • True." : ">>> • False.")
     .addField("**__Admin Only__**", cmd.adminOnly ? ">>> • True." : ">>> • False.")
      .addField("**__Owner Only__**", cmd.ownerOnly ? ">>> • True." : ">>> • False.")
       
      .addField("**__Nsfw__**", cmd.nsfw ? ">>> • True." : ">>> • False.")
      .addField("**__CoolDown Time__**", ">>> • " + cmd.cooldown.time)
      .addField("**__Bot Permissions__**", cmd.clientPermissions.length ? ">>> • " + cmd.clientPermissions.join(" , ") : ">>> • Not Provided.")
       .addField("**__Member Permissions__**", cmd.permissions.length ? ">>> • " + cmd.permissions.join(" , ") : ">>> • Not Provided.")
       .setTimestamp()   
       .setColor("RANDOM")
  
.setImage("https://media.discordapp.net/attachments/885113922489815052/885540471533862962/20210909_203127.jpg")
     
       message.channel.send({embeds:[embed]})
       
   } else {
       
     let dirss = []
    const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Select to get my commands! UwU')
      )

categories = [...new Set(client.commands.map((cmd) => cmd.category))];
  

for(const Dir of categories){
let icon;
let des;
  if(Dir === "boost"){
    icon = client.emoji.boost
    des = "Boost Detection Commands.."
  }
  if(Dir === "chatbot"){
    icon = client.emoji.chatbot
    des = "Chatbot Commands.."
  }
  if(Dir === "Mod"){
    icon = client.emoji.mod
    des = "Moderation Commands.."
  }
  if(Dir === "setup"){
    icon = client.emoji.config
    des = "Setup Commands.."
  }
  if(Dir === "Ticket"){
    icon = client.emoji.ticket
    des = "ticket Commands.."
  }
  if(Dir === "fun"){
    icon = client.emoji.fun
    des = "Fun Commands.."
  }
  if(Dir === "Images"){
    icon = client.emoji.images
    des = "Images Commands.."
  }
  if(Dir === "Owner"){
    icon = client.emoji.owner
    des = "King Commands.."
  }
  if(Dir === "General"){
    icon = client.emoji.general
    des = "General Commands.."
  }
  if(Dir === "Welcome"){
      icon = client.emoji.welcome
      des = "Welcome commands"
  }
  if(Dir === "Search"){
      icon = client.emoji.search
      des = "Search Commands. "
  }
  row.components[0].options.push([
  {
    label: `${Dir.toUpperCase()}`,
    description: `${des ? des : "no description."}`,
    value: `${Dir}`,
    emoji: `${icon ? icon : client.emoji.question}`
  }
  ])
}
    
    const embed = new MessageEmbed()
    .setDescription("Which category u wanna see ?")
    .setTitle("Demon- Help Command!")
    .setColor("RANDOM")  
    .setImage(images.dance())
    .setFooter(`©${new Date(). getFullYear()} Demon.`)
    .setTimestamp()
    
    message.channel.send({embeds: [embed], components: [row]}).then(msg => {
      let collector = msg.createMessageComponentCollector({componentType: "SELECT_MENU", time: 60000})

      collector.on("collect", i => {
        
        if(i.user.id !== message.author.id) return i.reply({content: "create your own help msg *baka*", ephemeral: true})

        let dir = i.values.map(c => { return c}).join(" ")
      
        let tr = client.commands.map(c => c).find(c => c.category === dir)

        let commands = client.commands.filter(c => c.category === dir)

        let I = 1

        let cmds = _.chunk(commands.map((c) => {
          
          return `${I++}• ${c.name} | ${client.commands.get(c.name).description}`
        }), 10)
        
        let pages = new Pages() 
          
        for(let c of cmds){
          pages.add(
            new MessageEmbed()
            .setTitle("Demon- Help Command!")
            .setColor("RANDOM")  
            .setThumbnail(images.dance())
            .setFooter(`©${new Date(). getFullYear()} Demon.`)
            .setTimestamp()
            .setDescription(c.join("\n\n"))
          )
        }

        msg.edit({embeds: [pages.firstPage], components: [row]}).then(m => {
          pagesCollector(m, message.author, 60000, pages)
        })
      })

      collector.on("end", () => {
        msg.edit({components: []})
      })
    })
 }
   } catch (e){
     message.error("Something went wrong ;)....")
     console.log(e)
    }
  } 
} 