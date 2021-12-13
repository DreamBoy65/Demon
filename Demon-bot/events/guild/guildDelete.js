const prefixSchema = require('../../models/prefix')
const { MessageEmbed } = require("discord.js")
const text = require("../../util/string")
module.exports = async(client, guild) => {
  if(!guild.name) return;
  
const owner = await client.users.fetch(guild.ownerId)
  .then(owner => owner.tag)
  .catch(() => '<Unfetched Data>');

  const logo = '<:leave:794918240651706389>';
  const members = text.commatize(guild.memberCount);
  const message = `${logo} : **${members}** members, owned by **${owner}**`;

    await client.channels.cache.get(client.config.logs?.guildleave)?.createWebhook(guild.name, {
    avatar: guild.iconURL({ format: 'png', dynamic: true, size: 128 })
  })
  .then(webhook => Promise.all([webhook.send(message), webhook]))
  .then(([_, webhook]) => webhook.delete())
  .catch(() => {});
    
	//Prefix 
prefixSchema.findOne({ Guild: guild.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            prefixSchema.findOneAndDelete({ Guild : guild.id }).then(console.log('deleted data.'))
        }
    })
}