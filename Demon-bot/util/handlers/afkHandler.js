const moment = require('moment');
const Schema = require("../../models/guild")

module.exports = {
    handleAfk: async function(client, message) {
        if(!message.guild) return;
        
        let data = await Schema.findOne({id: message.guild.id})

        if(!data) return;

        let id = await data.afk.map(c => c).find(c => c.id === message.author.id)

        if(id) {
            if(message.member.nickname?.includes("[AFK]")){
                message.member.setNickname(message.member.nickname.replace("[AFK]", ""))
            }

            message.reply("Welcome Back.\nI have removed your afk.")

        data.afk = data.afk.filter(c => c.id !== message.author.id)
        await data.save()
    }

    if(message.mentions.users.first()){
        
      message.mentions.users.map(async u => {
          
        let Id = await data.afk.map(c => c).find(c => c.id === u.id)

        if(Id){
        message.reply(`${client.users.cache.get(Id.id).tag} is currently afk - ${moment(Id.time).fromNow()}\nReason: ${Id.reason}`)
        }
      })
    }
  }
}