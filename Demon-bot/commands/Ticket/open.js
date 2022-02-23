const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
module.exports = {
    name: "ticket-create",
    aliases: [],
    category: "Ticket",
    description: "create a ticket",
    clientPermissions: ["SEND_MESSAGES",
        "EMBED_LINKS", "MANAGE_CHANNELS"],
    memberPermissions: [],
    examples: ["ticket-create"],
    cooldown: {
        time: 5000,
        message: ""
    },
    nsfw: false,
    guildOnly: true,
    execute: async (client, message, args, data) => {
        try {

            const Channel = await message.member.guild.channels.create(`Ticket-${data.tickets.uses}`, {
                parent: data.tickets.category ? data.tickets.category : null,
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL']
                    },
                    {
                        id: message.author.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
                    }
                ]
            })
            data.tickets.uses = data.tickets.uses + 1
            data.tickets.opened.push(Channel.id)

            await data.save()
            await message.reply({ content: "Ticket opened!\nHead to " + `<#${Channel.id}>`, ephemeral: true })

            const embed = new MessageEmbed()
                .setTitle("Welcome to Ticket.")
                .setDescription("Describe your issues here.")
                .setColor("RANDOM")
                .setTimestamp()

            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId("ticket-close")
                        .setLabel('Close')
                        .setStyle('DANGER')
                        .setEmoji(client.emoji.cross)
                );
            client.channels.cache.get(Channel.id).send({ embeds: [embed], components: [row] })

        } catch (e) {
            message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
            console.log(e)
        }
    }
}