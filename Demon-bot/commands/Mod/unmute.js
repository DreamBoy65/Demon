const { MessageEmbed } = require("discord.js")
const db = require('old-wio.db');

module.exports = {
        name: "unmute",
        aliases: ["um"],
        description: "Unmutes a member in the discord!",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
        category: "Mod",
        clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS", "MANAGE_GUILD"],
        memberPermissions: ["MANAGE_GUILD"],
    execute: async (client, message, args) => {
      
        let mutee = await client.resolvers.resolveMember({
          message,
          search: args[0]
        })
        
        if (!mutee) return message.channel.send("**Please Enter A Valid User!**");

        let reason = args.slice(1).join(" ");

        let muterole;
        let dbmute = await db.fetch(`muterole_${message.guild.id}`);
        let muteerole = message.guild.roles.cache.find(r => r.name === "muted")

        if (!message.guild.roles.cache.has(dbmute)) {
            muterole = muteerole
        } else {
            muterole = message.guild.roles.cache.get(dbmute)
        }
      
        let rolefetched = db.fetch(`muteeid_${message.guild.id}_${mutee.id}`)
        
        if (!rolefetched) return;

        if (!muterole) return message.channel.send("**There Is No Mute Role To Remove!**")
        if (!mutee.roles.cache.has(muterole.id)) return message.channel.send("**User is not Muted!**")
        try {
        mutee.roles.remove(muterole.id).then(() => {
            mutee.send(`**Hello, You Have Been Unmuted In ${message.guild.name} for ${reason || "No Reason"}**`).catch(() => null)
            let roleadds = rolefetched
            if (!roleadds) return;
            mutee.roles.add(roleadds)
        })
        await db.delete(`muteeid_${message.guild.id}_${mutee.id}`)
        } catch (e){
            message.channel.send("error: "+ e.message)                          
          }
            const sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${mutee.user.username} was successfully unmuted.`)
            message.channel.send({embeds: [sembed]});
        

        

    }
}