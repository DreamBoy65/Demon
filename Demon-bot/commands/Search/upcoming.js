const { MessageEmbed, GuildEmoji } = require('discord.js');
const _ = require('lodash');
const fetch = require('node-fetch');

const Paginate = require('../../util/helpers/pages');
const text = require('../../util/string');

const types = ['TV', 'ONA', 'OVA', 'Movie', 'Special', '-'];

module.exports = {
	name: 'upcoming',
	aliases: [],
	category: 'Search',
	description: 'Displays the list of upcoming anime.',
    examples: ["upcoming"],
	execute: async (client, message, args) => {
		let type = args[0];

if(!type) return message.reply({embeds: [{
  title: `Select between: \n${types.join("\n")}`
}]})
		if (types.some(x => x.toLowerCase() === type.toLowerCase())) {
			type =
				types[types.findIndex(c => c.toLowerCase() === type.toLowerCase())];
		} else {
			type = null;
		}

		const embed = new MessageEmbed()
			.setColor('YELLOW')
			.setThumbnail('https://i.imgur.com/u6ROwvK.gif')
			.setDescription(
				`\u200B\n Fetching upcoming **${type ||
					' '}** anime from [MyAnimeList](https://myanimelist.net 'MyAnimeList Homepage').\n\u200B`
			)
			.setTimestamp();

		let msg = await message.channel.send({embeds: [embed]});

		let res = await fetch(`https://api.jikan.moe/v3/season/later`).then(res =>
			res.json()
		);

		if (!res || res.error) {
			res = res ? res : {};

			embed
				.setColor('RED')
				.setAuthor(
					'Response Error',
					'https://cdn.discordapp.com/emojis/767062250279927818.png?v=1'
				)
				.setDescription(
					[
						`**${
							message.member.displayName
						}**, 'An unexpected error occured!'\n\n`,
						`MyAnimeList responded with error code ${res.status}`
					].join('')
				)
				.setThumbnail('https://i.imgur.com/qkBQB8V.png');

			return (
				(await msg.edit({embeds: [embed]})).catch(() => null)) ||
				(await message.channel.send({embeds: [embed]}))
		}

		if (types.includes(type)) {
			res.anime = res.anime.filter(f => f.type === type);
		}

		const chunks = 8;
		const descriptions = _.chunk(
			res.anime.map(anime => {
				return text.truncate(
					[
						`[**${anime.title}**](https://myanimelist.net/anime/${
							anime.mal_id
						})`,
						`\`${[
							!type ? ' ' + anime.type : null,
							text.joinArray(anime.genres.map(x => x.name))
						]
							.filter(Boolean)
							.join('\u2000\u2000|\u2000\u2000')} \``,
						anime.synopsis
							.replace(/\r\n/g, ' ')
							.replace('(No synopsis yet.)', '')
					]
						.filter(Boolean)
						.join('\n'),
					Math.floor(2000 / chunks)
				);
			}),
			chunks
		);

		const pages = new Paginate();
		let index = 0;

		for (const anime of descriptions) {
			pages.add(
				new MessageEmbed()
					.setColor('GREY')
					.setAuthor(`Upcoming Anime List\u2000|\u2000Type: ${type || 'ALL'}`)
					.setDescription(`${anime.join('\n\n')} `)
					.setFooter(
						[
							`Upcoming Anime Query with MAL`,
							`Page ${index + 1} of ${descriptions.length}`].join('\u2000|\u2000')
					)
			);
			index++;
		}

		msg =
			(await msg.edit({embeds: [pages.firstPage]}).catch(() => null)) ||
			(await message.channel.send({embeds: [pages.firstPage]}));

		if (pages.size === 1) {
			return;
		}

		const prev = client.emojis.cache.get('767062237722050561') || '◀';
		const next = client.emojis.cache.get('767062244034084865') || '▶';
		const terminate = client.emojis.cache.get('767062250279927818') || '❌';

		const filter = (_, user) => user.id === message.author.id;
		const collector = msg.createReactionCollector(filter);
		const navigators = [prev, next, terminate];
		let timeout = setTimeout(() => collector.stop(), 90000);

		for (let i = 0; i < navigators.length; i++) {
			await msg.react(navigators[i]);
		}

		collector.on('collect', async reaction => {
			switch (reaction.emoji.name) {
				case prev instanceof GuildEmoji ? prev.name : prev:
					msg.edit({embeds: [pages.previous()]});
					break;
				case next instanceof GuildEmoji ? next.name : next:
					msg.edit({embeds:[pages.next()]});
					break;
				case terminate instanceof GuildEmoji ? terminate.name : terminate:
					collector.stop();
					break;
			}

			await reaction.users.remove(message.author.id);
			timeout.refresh();
		});

		collector.on('end', async () => await msg.reactions.removeAll());
	}
};
