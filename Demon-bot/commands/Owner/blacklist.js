const db = require("old-wio.db")
module.exports = {
  name: "blacklist",
  category: "Owner",
  aliases:["bl"],
  execute: async(client, message, args)=>{
if(message.author.id!== "813299347819069520") return 

if(args[0] === "user"){
  let user = args[1]
 
  db.push("Blacklisted", {
    username: client.users.cache.get(user).username,
    id: user
  })
  message.channel.send("Done!")
} else if(args[0] === "unuser"){
  let user = args[1]
  let list = await db.fetch("Blacklisted")
    
  db.set("Blacklisted", list.filter(c => c.id === user))
message.channel.send("Done!")
}
  }
}