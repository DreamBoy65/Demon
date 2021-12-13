
module.exports = {
  name: "blacklist",
  category: "Owner",
  aliases:["bl"],
  ownerOnly: true,
  execute: async(client, message, args)=>{

if(args[0] === "user"){
  let user = args[1]
 
   client.json.push("Blacklisted", {
    username: client.users.cache.get(user).username,
    id: user
  })
  message.channel.send("Done!")
} else if(args[0] === "unuser"){
  let user = args[1]
  let list = await client.json.get("Blacklisted")
    
  client.json.set("Blacklisted", list.filter(c => c.id === user))
message.channel.send("Done!")
}
  }
}