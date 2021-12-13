module.exports = (client, oldMember, newMember) => {
 const oldStatus = oldMember.premiumSince;
  const newStatus = newMember.premiumSince;

  if(!oldStatus && newStatus){
   client.emit("guildMemberBoost", newMember)
  }

  if(oldStatus && !newStatus){
    client.emit("guildMemberUnboost", newMember)
  }
}