const { Message, MessageEmbed } = require("discord.js")
const emoji = require(`${process.cwd()}/Demon-bot/config/Emoji`)

Message.prototype.send = async function(des, options = {}) {
  
  let embed = new MessageEmbed()
  .setAuthor(this.author.username, this.author.displayAvatarURL())
  .setDescription(des)
  .setColor("RANDOM")
  .setFooter(`\©${new Date().getFullYear()} Demon-`)
  .setTimestamp()

  if(options.title) {
    embed.setTitle(options.title)
  }

  if(options.image) {
    embed.setImage(options.image)
  }

  if(options.fields?.length) {
    embed.addFields(options.fields)
  }

  if(options.thumb) { 
    embed.setThumbnail(options.thumb)
  }

  return this.reply({embeds: [embed]})
}

Message.prototype.error = function(string){
  
return this.reply({
  embeds: [
    new MessageEmbed()
    .setAuthor(this.author.username, this.author.displayAvatarURL())
    .setDescription(`${emoji.cross}` + " | " + string)
    .setColor("RED")
    .setFooter(`ERROR | \©${new Date().getFullYear()} Demon-`)
    .setTimestamp()
  ]})
}

Message.prototype.success = function(string){
  
return this.reply({
    embeds: [
    new MessageEmbed()
    .setAuthor(this.author.username, this.author.displayAvatarURL())
    .setDescription(`${emoji.tick} | ${string}`)
    .setColor("GREEN")
    .setFooter(`SUCCESS \©${new Date().getFullYear()} Demon-`)
    .setTimestamp()
  ]})
}

Message.prototype.Reply = function(string) {
  return this.reply(string)
}