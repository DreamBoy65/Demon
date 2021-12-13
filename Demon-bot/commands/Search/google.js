const superagent = require('superagent');
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'google',
	category: 'Search',
	description: 'Google search',
	usage: '{query}',
	
	execute : async (client, message, args) => {
		let query = args.join(' ');
		if (!query)
			return message.reply({
				embeds: [{
					title: 'Give me a query to search!',
					color: 'RANDOM'
				}]
			});

		let result = await superagent
			.get('https://customsearch.googleapis.com/customsearch/v1')
			.query({
				q: query,
				cx: 'a2e8574ac38af30f9',
				key: 'AIzaSyDTZJ7othgqvO5vk68EB6q95AW4ewlzfxM'
			});

		if (!result.body.items)
			return message.reply({
				embeds: [{
					title: 'No result found related to : ' + query,
					color: 'RANDOM'
				}]
			});
		if (result.status >= 400)
			return message.reply({
				embeds: [{
					title: 'An error happened :sob:',
					color: 'RANDOM'
				}]
			});

		let res = result.body.items[0];

    if(!res.pagemap?.cse_image?.length) return message.channel.send("No Images Found *lol*")
		const embed = new MessageEmbed()
			.setTitle(res.title)
			.setAuthor(message.author.tag, message.author.displayAvatarURL())
			.setDescription(res.snippet)
			.setURL(res.link)
.setImage(res.pagemap?.cse_image[0]?.src || res.pagemap?.cse_thumbnail[0]?.src)
			.setColor("RANDOM")
			.setTimestamp()
			return message.reply({embeds: [embed]})
	}
};
