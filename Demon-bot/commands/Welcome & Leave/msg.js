
const Discord = require("discord.js");

const { Database } = require('quickmongo');
const db = new Database(process.env.MONGODB);
module.exports = {
  name: "setmessage",
  aliases: ["setmsg", "sm"],
  description: "Set The Welcome Or Leave Message When Someone Joins Or Leave!",
category: "Welcome",
  usage: "Setmessage <Type> <Message>",
  execute: async (client, message, args) => {
    
    if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send("You need Manage_server perms to execute this cmd.")
    
    let Type = args[0];
    let Welcome = ["welcome", "wel", "join"];
    let leave = ["leave", "left"];
    let Types = [];
    Welcome.forEach(wel => Types.push(wel));
    leave.forEach(leav => Types.push(leav));
    
    if (!Type || !Types.find(T => T === Type.toLowerCase())) return message.channel.send(`Please Give A Valid Type - Welcome, Wel, Join, Leave, Left`);
    
    Type = Type.toLowerCase();
    
    let Msg = args.slice(1).join(" ");
    
    if (!Msg) return message.channel.send({embed:{
      title:`Please Give Message\n\nCustom:\n<ServerName> => Server Name\n<MemberName> => Member Name\n<MemberMention> => Member Mention`,
      color: "RANDOM"
    }});
    
    if (Msg.length > 1000) return message.channel.send({embeds: [{
      title: "message couldnot be long than 1000 characters", 
      color: "RANDOM"
    }]})
    
    async function GetType(Type) {
      if (Welcome.find(W => W === Type)) {
        return "Welcome";
      } else {
        return "Leave";
      };
    };
    
    let Current = await GetType(Type);
    
    
    const Embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`Sucess`)
    .setDescription(`${Current === "Welcome" ? "Welcome" : "Leave"} Message Has Been Setted -\n${Msg}`)
    .setFooter(`Setted By ${message.author.username}`)
    .setTimestamp();

    await db.set(`${Current === "Welcome" ? "Welcome" : "Leave"}_${message.guild.id}_Msg`, Msg);

    try {
        return message.channel.send({embeds: [Embed]});
    } catch (error) {
        return message.channel.send(`${Current === "Welcome" ? "Welcome" : "Leave"} Message Has Been Setted -\n${Msg}`);
    };

  }
};