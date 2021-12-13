const { MessageEmbed } = require('discord.js');
const _ = require('lodash');

module.exports = {
  name: 'listrole',
  aliases: [ 'roles' ],
  category: "Mod",
  guildOnly: true,
  description: 'Displays in list all of the roles this server has',
  execute: async (client, message) => message.Reply({embeds: [
    new MessageEmbed()
    .setColor('GREY')
    .setAuthor(`💮 ${message.guild.name} Roles List`)
    .setFooter(`Listrole `)
    .addFields(
      _.chunk(message.guild.roles.cache.array()
        .filter(x => x.id !== message.guild.id)
        .sort((A,B) => B.rawPosition - A.rawPosition), 10)
        .map(x => {
          return {
            name: '\u200b', inline: true,
            value: '\u200b' + x.map(x => `\u2000•\u2000${x}`).join('\n')
          };
        })
    )
  ]})
};