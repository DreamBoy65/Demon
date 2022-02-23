const Schema = require(`${process.cwd()}/Demon-bot/models/guild`)
const { check } = require(`${process.cwd()}/Demon-bot/util/checkperms`)

module.exports = {
  handleCmd: async function(client, message) {

    let data;
    
    if(message.guild) {
      if(!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) {
        return { executed: false, reason: 'PERMISSION_SEND'};
      } else {
        //Nothing.
      }

      data = await Schema.findOne({id: message.guild.id})

      if(!data) {
          await new Schema({
              id: message.guild.id
        }).save()   

          data = await Schema.findOne({id: message.guild.id})
      
      }
    }

    let prefix = await client.functions.getPrefix(message)

    if(!prefix) return; 

      let UserId = await client.json?.get(`stick-${message.guild?.id}_${message.author?.id}`)

    if(UserId) {
       message.reply(UserId)
    }

    if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))){
			if(message.guild){
				return message.reply(`Heyyyy! Im demon a multipurpose bot. my prefix is ${prefix} to check my all commands type: ${prefix}help`)
			} else {
				return message.reply(`${client.emoji.hello} | Heyy, my prefix is $. type: $help to check my all commands.`)
			}
		}
    

    message.member = await message.guild?.members.fetch(message.author.id);
    
		const args = message.content
			.slice(prefix.length)
			.trim()
			.split(/ +/g);
    
		const cmd = args.shift().toLowerCase();
    
		if (cmd.length === 0) return;
    
		let command = client.commands.get(cmd);
    
		if (!command) command = client.commands.get(client.aliases.get(cmd));

		if (!command) return;

    try {
      let { accept, embed } = check(message, command)

      if(!accept) {
        return message.reply({embeds: [embed]})
      }
      
      command.execute(client, message, args, data, prefix)

      await client.channels.cache.get(client.config.logs.commands)?.createWebhook(message.author.tag, {
    avatar: message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 128 })
  })
  .then(webhook => Promise.all([webhook.send(`Command used in **${message.guild.name}**\nCommand: ${command.name}`), webhook]))
  .then(([_, webhook]) => webhook.delete())
  .catch(() => {});
        
      
    } catch (e) {
      console.log(e)
      message.error("Something went wrong:()")
    }
  }
}