module.exports = {
    name: "setmemechannel",
    aliases: [],
    category: "setup",
    description: "set the automatic meme channel.",
    clientPermissions: ["SEND_MESSAGES",
        "EMBED_LINKS"],
    memberPermissions: ["MANAGE_GUILD"],
    examples: ["setmemechannel #memes"],
    cooldown: {
        time: 5000,
        message: ""
    },
    nsfw: false,
    guildOnly: true,
    execute: async (client, message, args) => {
        try {

            let channel = await client.resolvers.resolveChannel({
                message,
                search: args.join(" "),
                channelType: "GUILD_TEXT"
            })

            if (!channel) return message.error("Mention a channel where you want to send memes.")

            client.mongo.set(`meme-channel_${message.guild.id}`, channel.id);

            message.success("Setup complete. ")

        } catch (e) {
            message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
            console.log(e)
        }
    }
}