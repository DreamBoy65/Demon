const { Database } = require('quickmongo');
const db = new Database(process.env.MONGODB);
const options = ["on", "off"]
const opts2 = ["welcome", "leave"]
module.exports = {
  name: "wl-image",
  category: "Welcome",
  description: "set welcome and leave image",
  usage: "on/off {attachment}",
  execute: async(client, message, args)=>{
    if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send("You need Manage_server perms to execute this cmd.")
    
    const option = args[0]
    const opt2 = args[1]
    
    if(!options.includes(option)) return message.channel.send("**Choose between on/off**!")
    
    if(option === "on"){
      if(!opts2.includes(opt2)) return message.channel.send("**Choose between welcome or leave**! and attach the image to your message!")
   
   if(opt2 === "welcome"){
     const image = await db.fetch(`Wel_${message.guild.id}_image`)
let Image
     if(image){
      Image = image
     } else {
       Image = "https://images.wallpaperscraft.com/image/landscape_art_road_127350_1280x720.jpg"
     }
     const ims = message.attachments.first()
     
     if(!ims){
       message.channel.send(`currently image is: ${Image}`)
     } else {
       db.set(`Wel_${message.guild.id}_image`, ims.url ? ims.url : ims)
       db.delete(`image_${message.guild.id}_w`)
       message.channel.send("**Welcome BackGround sets**!")
     }
   }
if(opt2 === "leave"){
     const image = await db.fetch(`Leave_${message.guild.id}_image`)
let Image
     if(image){
       Image = image
     } else {
       Image = "https://images.wallpaperscraft.com/image/cat_night_lights_74375_1280x720.jpg"
     }
     const ims = message.attachments.first()
     
     if(!ims){
       message.channel.send(`currently image is: ${Image}`)
     } else {
       db.set(`Leave_${message.guild.id}_image`, ims.url ? ims.url : ims)
       message.channel.send("**Leave BackGround sets**!")
     }
   }
   
    }
    if(option === "off"){
      if(!opts2.includes(opt2)) return message.channel.send("**Choose between welcome or leave**!")
      if(opt2 === "welcome"){
db.set(`image_${message.guild.id}_w`, "off")
      message.channel.send("**Welcome BackGround image disabled**!")
      } else {
if(opt2 === "leave"){
db.set(`image_${message.guild.id}_l`, "off")
      message.channel.send("**Leave BackGround image disabled**!")
}
      }
    }
  }
}