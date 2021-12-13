const axios = require('axios');
const Discord = require('discord.js');
module.exports = {
	name: 'banner',
	category: 'Mod',
	description: 'shows the banner of user',
	execute: async (client, message, args) => {
		const member =
			message.mentions.users.first() ||
			message.guild.members.cache.get(args[0]) ||
			message.author
		const bannerUrl = await getUserBannerUrl(member.id, client, { size: 4096 });
		
		if (bannerUrl) {
			const embed = new Discord.MessageEmbed()
				.setTitle(`${member.username}'s banner`)
				.setImage(bannerUrl)
				.setColor('RANDOM');
			message.Reply({embeds: [embed]});
		} else {
			message.Reply("That user doesn't have any banner :(");
		}
	}
};
async function getUserBannerUrl(
	userId,
	client,
	{ dynamicFormat = true, defaultFormat = 'webp', size = 512 } = {}
) {
	if (![16, 32, 64, 128, 256, 512, 1024, 2048, 4096].includes(size)) {
		throw new Error(`The size '${size}' is not supported!`);
	}

	if (!['webp', 'png', 'jpg', 'jpeg'].includes(defaultFormat)) {
		throw new Error(
			`The format '${defaultFormat}' is not supported as a default format!`
		);
	}
	const user = await client.api.users(userId).get();
	if (!user.banner) return null;

	const query = `?size=${size}`;
	const baseUrl = `https://cdn.discordapp.com/banners/${userId}/${user.banner}`;
	if (dynamicFormat) {
		const { headers } = await axios.head(baseUrl);
		if (headers && headers.hasOwnProperty('content-type')) {
			return (
				baseUrl +
				(headers['content-type'] == 'image/gif'
					? '.gif'
					: `.${defaultFormat}`) +
				query
			);
		}
	}

	return baseUrl + `.${defaultFormat}` + query;
}
