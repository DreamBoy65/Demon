const { Message } = require("discord.js")

module.exports = {
  name: "nuke",
category: 'Mod',
  description: "nuke the channel",
  execute: async(client, message, args) => {
    
    if(message.member.id !== message.guild.ownerId) return message.channel.send("<a:crosss:844939715816063024> | **only owner can execute this command**")
    if(!message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.channel.send("<a:crosss:844939715816063024> | **I need Manage Channel perm to execute this command")
    
    message.channel.clone().then((ch) => {
      ch.setParent(message.channel.parent.id)
      ch.setPosition(message.channel.position)
      message.channel.delete()
      
      ch.send("☢NUKED☢")
    })
  }
}