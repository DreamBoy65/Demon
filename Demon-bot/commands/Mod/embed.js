module.exports = {
  name: "embed",
  description: "create an embed",
category: 'Mod',
  
  execute(bot, message, args)  {
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send("<a:crosss:844939715816063024> | You do not have **MANAGE_MESSAGES** permission!");
const simplydjs = require('simply-djs')


simplydjs.embedCreate(message)
  }
}