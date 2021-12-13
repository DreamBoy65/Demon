const {Database} = require("quickmongo")
const db = new Database(process.env.MONGODB)
const canvas = require("discord-canvas")
const modifier = require("../../util/modify")

const Discord = require("discord.js")
module.exports = async(client, member) => {
let Limage = await db.fetch(`Leave_${member.guild.id}_image`)

if(!Limage) Limage = "https://images.wallpaperscraft.com/image/landscape_art_road_127350_1280x720.jpg"

const opt = await db.fetch(`image_${member.guild.id}_l`)

let Channel = await db.fetch(`leave-channel_${member.guild.id}`);
  if (!Channel) return;
  let Message = await db.fetch(`Leave_${member.guild.id}_Msg`);
  if (!Message) Message = `${member.user.username} Has Left The Server!`;
  
  if (member.user.username.length > 25) member.user.username = member.user.username.slice(0, 25) + "...";
  if (member.guild.name.length > 15) member.guild.name = member.guild.name.slice(0, 15) + "...";
  
  let Msg = Message.replace("<ServerName>", member.guild.name).replace("<MemberName>", member.user.username).replace("<MemberMention>", `<@${member.user.id}>`);
  
  let m = await modifier.modify(Msg, member)
  let Leaved = new canvas.Goodbye();
  let Image = await Leaved
  .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setGuildName(member.guild.name)
  .setAvatar(member.user.displayAvatarURL({ dynamic: false, format: "jpg" }))
  .setMemberCount(member.guild.memberCount)
  .setBackground(Limage)
  .toAttachment();
  
  let Attachment = new Discord.MessageAttachment(Image.toBuffer(), "Welcome.png");
  const lchannel = member.guild.channels.cache.get(Channel)
  
  if(opt === "off"){
    lchannel.send(m)
  } else {
    lchannel.send({content: m, files: [Attachment]})
  }
}