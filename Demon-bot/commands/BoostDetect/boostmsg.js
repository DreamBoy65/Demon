module.exports = {
  name: "setboostmsg",
  aliases: [],
  category: "boost",
  description: "set the boost message",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["setboostmsg embed hlo"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  execute: async(client, message, args, data) => {
    try {

      let type = args[0]
      let msg = args.slice(1).join(" ")

      if(!type || !["text", "embed"].includes(type.toLowerCase()) || !msg) return message.error(`Examples: \nsetboostmsg embed/text Thnx for boosting.\n\nCustoms: \n{avatar} => user avatar.
{avatarDynamic} => user dynamic avatar.
{channelCount} =>  server's total channel count.
{categoryChannelCount} => server's category count.
{textChannelCount} => server's total text channel count.
{voiceChannelCount} => server's total voice channel count.
{createdAt} => user created date.
{discriminator} => user discriminator/tag.
{displayColor} => user role color.
{displayName} => user name.
{guildIcon} => guild Icon.
{guildIconDynamic} => dynamic guild  icon.
{guildName} => guild name.
{guildOwner} => guild owner's username.
{guildOwnerNickname} => guild owner's nickname.
{guildOwnerTag} => guild owner's tag.
{joinedAt} => user joined date.
{joinedAtMDY} => user joined date in mdy form.
{memberCount} => member count of a guild.
{user} => user username.
{tag} => user tag.
{userNickname} => user nickname.
{userTag} => user username + tag
{usermention} => mention the user.
{memberJoinRank} => join rank of user.
{memberJoinRankOrdinalized} => ordanalized like 3rd.`)

      if(type === "embed") {
        data.boostMsg = msg
        data.boostEmbed = true

        await data.save()

        message.success("Setup complete.")
      } else {
        data.boostMsg = msg
        data.boostEmbed = false

        await data.save()

        message.success("Setup complete.")
      }
      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}