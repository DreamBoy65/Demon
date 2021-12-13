const {Database} = require("quickmongo")
const db = new Database(process.env.MONGODB)
const modifier = require("../../util/modify")
const canvas = require("discord-canvas")
let Welcomed = new canvas.Welcome();
const Discord = require("discord.js")
module.exports = async(client, member) => {
let Wimage = await db.fetch(`Wel_${member.guild.id}_image`)

if(!Wimage) Wimage = "https://images.wallpaperscraft.com/image/landscape_art_road_127350_1280x720.jpg"

const opt = await db.fetch(`image_${member.guild.id}_w`)
  let Channel = await db.fetch(`wlcm-channel_${member.guild.id}`);
  if (!Channel) return;
  let Message = await db.fetch(`Welcome_${member.guild.id}_Msg`);
  if (!Message) Message = `Welcome To The Server!`;
  
  if (member.user.username.length > 25) member.user.username = member.user.username.slice(0, 25) + "...";
  if (member.guild.name.length > 15) member.guild.name = member.guild.name.slice(0, 15) + "...";
  
  let Msg = Message.replace("<ServerName>", member.guild.name).replace("<MemberName>", member.user.username).replace("<MemberMention>", `<@${member.user.id}>`)
  
  let m = await modifier.modify(Msg, member)
  
  let Welcomed = new canvas.Welcome();
  let Image = await Welcomed
  .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setGuildName(member.guild.name)
  .setAvatar(member.user.displayAvatarURL({ dynamic: false, format: "jpg" }))
  .setMemberCount(member.guild.memberCount)
   .setBackground(Wimage)
   .toAttachment();


  
  let Attachment = new Discord.MessageAttachment(Image.toBuffer(), "Welcome.png");

  const wchannel = client.channels.cache.get(Channel)
  
  if(opt === "off"){
    wchannel.send(m)
  } else {
    wchannel.send({content: m, files: [Attachment] })
  }
}