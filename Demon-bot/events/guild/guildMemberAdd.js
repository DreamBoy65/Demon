const {Database} = require("quickmongo")
const db = new Database(process.env.MONGODB)
const modifier = require("../../util/modify")
const fetch = require("node-fetch")
const Discord = require("discord.js")
const { welcomeImage } = require('discord-welcome-card');

module.exports = async(client, member) => {
let Wimage = await db.fetch(`Wel_${member.guild.id}_image`)

if(!Wimage) Wimage = "https://images.wallpaperscraft.com/image/landscape_art_road_127350_1280x720.png"

const opt = await db.fetch(`image_${member.guild.id}_w`)
  let Channel = await db.fetch(`wlcm-channel_${member.guild.id}`);
  if (!Channel) return;
  let Message = await db.fetch(`Welcome_${member.guild.id}_Msg`);
  if (!Message) Message = `Welcome To The Server!`;
  
  if (member.user.username.length > 25) member.user.username = member.user.username.slice(0, 25) + "...";
  if (member.guild.name.length > 15) member.guild.name = member.guild.name.slice(0, 15) + "...";
  
  let Msg = Message.replace("<ServerName>", member.guild.name).replace("<MemberName>", member.user.username).replace("<MemberMention>", `<@${member.user.id}>`)
  
  let m = await modifier.modify(Msg, member)
  
  const Image = await welcomeImage(member, {
      theme: 'dark',
      text: {
        title: 'Welcome to this server,',
        text: member.user.tag,
        subtitle: `MemberCount: ${member.guild.memberCount}`,
        color: `#88f`
      },
      avatar: {
          image: member.user.displayAvatarURL({ format: 'png' }),
          outlineWidth: 5,
    },
    background: Wimage,
    blur: 1,
    border: true,
    rounded: true
    });
    
  let Attachment = new Discord.MessageAttachment(Image, "Welcome.png");

  const wchannel = client.channels.cache.get(Channel)
  
  if(opt === "off"){
    wchannel.send(m)
  } else {
    wchannel.send({content: m, files: [Attachment] })
  }
}