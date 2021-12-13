module.exports = (client, oldGuild, newGuild) => {
  if (oldGuild.premiumTier < newGuild.premiumTier) {
        client.emit('guildBoostLevelUp', newGuild, oldGuild.premiumTier, newGuild.premiumTier);
    }

  if (oldGuild.premiumTier > newGuild.premiumTier) {
        client.emit('guildBoostLevelDown', oldGuild, newGuild);
    }
}