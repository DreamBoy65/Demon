const { MessageEmbed,  client} = module.require("discord.js");

module.exports = {
   name: "lock",
category: 'Mod',
   description: "Locks a Channel",
   async execute(client, message, args)  {
   if (!message.member.permissions.has('MANAGE_SERVER', 'MANAGE_CHANNELS')) {
   return message.channel.send("<a:crosss:844939715816063024> | You don't have **MANAGE_SERVER** Or **MANAGE_CHANNELS** Permissions")
   }
   message.channel.permissionOverwrites.edit(message.guild.id, {
     SEND_MESSAGES: false
   })
     
     
   const embed = new MessageEmbed()
   .setTitle("Channel Updates")
   .setDescription(`🔒 ${message.channel} has been Locked`)
   .setColor("RANDOM");
   await message.channel.send({embeds: [embed]});
   message.delete();
}
}
