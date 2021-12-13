const { MessageEmbed,  client}= module.require("discord.js");

module.exports = {
   name: "unlock",
   description: "Unlocks a Channel",
category: 'Mod',
   async execute(client, message, args) {
   if (!message.member.permissions.has('MANAGE_SERVER', 'MANAGE_CHANNELS')) {
   return message.channel.send("<a:crosss:844939715816063024> | You don't have **MANAGE_SERVER** OR **MANAGE_CHANNELS** Permission to execute this command")
   }
   message.channel.permissionOverwrites.edit(message.guild.id, {
     SEND_MESSAGES: null
   })
   const embed = new MessageEmbed()
   .setTitle("Channel Updates")
   .setDescription(`🔓 ${message.channel}  has been Unlocked`)
   .setColor("RANDOM");
   await message.channel.send({embeds: [embed]});
   message.delete();
}
}
