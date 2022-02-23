const translate = require("@iamtraction/google-translate");

const Discord = require('discord.js');

const langs = [
	'afrikaans',
	'albanian',
	'amharic',
	'arabic',
	'armenian',
	'azerbaijani',
	'bangla',
	'basque',
	'belarusian',
	'bengali',
	'bosnian',
	'bulgarian',
	'burmese',
	'catalan',
	'cebuano',
	'chichewa',
	'corsican',
	'croatian',
	'czech',
	'danish',
	'dutch',
	'english',
	'esperanto',
	'estonian',
	'filipino',
	'finnish',
	'french',
	'frisian',
	'galician',
	'georgian',
	'german',
	'greek',
	'gujarati',
	'haitian creole',
	'hausa',
	'hawaiian',
	'hebrew',
	'hindi',
	'hmong',
	'hungarian',
	'icelandic',
	'igbo',
	'indonesian',
	'irish',
	'italian',
	'japanese',
	'javanese',
	'kannada',
	'kazakh',
	'khmer',
	'korean',
	'kurdish (kurmanji)',
	'kyrgyz',
	'lao',
	'latin',
	'latvian',
	'lithuanian',
	'luxembourgish',
	'macedonian',
	'malagasy',
	'malay',
	'malayalam',
	'maltese',
	'maori',
	'marathi',
	'mongolian',
	'myanmar (burmese)',
	'nepali',
	'norwegian',
	'nyanja',
	'pashto',
	'persian',
	'polish',
	'portugese',
	'punjabi',
	'romanian',
	'russian',
	'samoan',
	'scottish gaelic',
	'serbian',
	'sesotho',
	'shona',
	'sindhi',
	'sinhala',
	'slovak',
	'slovenian',
	'somali',
	'spanish',
	'sundanese',
	'swahili',
	'swedish',
	'tajik',
	'tamil',
	'telugu',
	'thai',
	'turkish',
	'ukrainian',
	'urdu',
	'uzbek',
	'vietnamese',
	'welsh',
	'xhosa',
	'yiddish',
	'yoruba',
	'zulu'
];

const languages = {
	auto: 'Automatic',
	af: 'Afrikaans',
	sq: 'Albanian',
	am: 'Amharic',
	ar: 'Arabic',
	hy: 'Armenian',
	az: 'Azerbaijani',
	eu: 'Basque',
	be: 'Belarusian',
	bn: 'Bengali',
	bs: 'Bosnian',
	bg: 'Bulgarian',
	ca: 'Catalan',
	ceb: 'Cebuano',
	ny: 'Chichewa',
	'zh-cn': 'Chinese Simplified',
	'zh-tw': 'Chinese Traditional',
	co: 'Corsican',
	hr: 'Croatian',
	cs: 'Czech',
	da: 'Danish',
	nl: 'Dutch',
	en: 'English',
	eo: 'Esperanto',
	et: 'Estonian',
	tl: 'Filipino',
	fi: 'Finnish',
	fr: 'French',
	fy: 'Frisian',
	gl: 'Galician',
	ka: 'Georgian',
	de: 'German',
	el: 'Greek',
	gu: 'Gujarati',
	ht: 'Haitian Creole',
	ha: 'Hausa',
	haw: 'Hawaiian',
	iw: 'Hebrew',
	hi: 'Hindi',
	hmn: 'Hmong',
	hu: 'Hungarian',
	is: 'Icelandic',
	ig: 'Igbo',
	id: 'Indonesian',
	ga: 'Irish',
	it: 'Italian',
	ja: 'Japanese',
	jw: 'Javanese',
	kn: 'Kannada',
	kk: 'Kazakh',
	km: 'Khmer',
	ko: 'Korean',
	ku: 'Kurdish (Kurmanji)',
	ky: 'Kyrgyz',
	lo: 'Lao',
	la: 'Latin',
	lv: 'Latvian',
	lt: 'Lithuanian',
	lb: 'Luxembourgish',
	mk: 'Macedonian',
	mg: 'Malagasy',
	ms: 'Malay',
	ml: 'Malayalam',
	mt: 'Maltese',
	mi: 'Maori',
	mr: 'Marathi',
	mn: 'Mongolian',
	my: 'Myanmar (Burmese)',
	ne: 'Nepali',
	no: 'Norwegian',
	ps: 'Pashto',
	fa: 'Persian',
	pl: 'Polish',
	pt: 'Portuguese',
	pa: 'Punjabi',
	ro: 'Romanian',
	ru: 'Russian',
	sm: 'Samoan',
	gd: 'Scots Gaelic',
	sr: 'Serbian',
	st: 'Sesotho',
	sn: 'Shona',
	sd: 'Sindhi',
	si: 'Sinhala',
	sk: 'Slovak',
	sl: 'Slovenian',
	so: 'Somali',
	es: 'Spanish',
	su: 'Sundanese',
	sw: 'Swahili',
	sv: 'Swedish',
	tg: 'Tajik',
	ta: 'Tamil',
	te: 'Telugu',
	th: 'Thai',
	tr: 'Turkish',
	uk: 'Ukrainian',
	ur: 'Urdu',
	uz: 'Uzbek',
	vi: 'Vietnamese',
	cy: 'Welsh',
	xh: 'Xhosa',
	yi: 'Yiddish',
	yo: 'Yoruba',
	zu: 'Zulu'
};

module.exports = {
	name: 'translate',
	category: "Search",
    examples: ["translate hindi hello"],
	async execute(client, message, args) {
		const lang = args[0];
		const q = args.slice(1).join(' ');

		const langsList =
			'```Css\n' + langs.map((l, i) => `#${i + 1} - ${l}`).join('\n') + '```';

		if (!lang)
			return message.channel.send(
				'**Please specify language to translate**!\nFormat : `$translate  [language] [text]`'
			);

		if (lang === 'list')
			return message.channel.send({
				embeds: [{
					title: 'VALID LANGUAGES : ' + langs.size,
					description: langsList,
					color: 'RANDOM'
				}]
			});

		if (!langs.includes(lang))
			return message.channel.send(
				'**INVALID LANGUAGE**\n**type: `$translate list` to get list of LANGUAGES**!\nFormat: `$translate [language] [text]`'
			);

		if (!q)
			return message.channel.send(
				'**Please specify the message to translate**\nFormat: `$translate  [language] [text]`'
			);

		const m = await message.channel.send('**Translating.........**');
	const translated = await translate(q, { to: lang }).catch(e => {
			message.channel.send({
				embeds: [{
					title: 'error!',
					description: e.message
				}]
			});
		});
const l = translated.from.language.iso

		const resEmbed = new Discord.MessageEmbed()
			.setAuthor(
				'Translator',
				client.user.displayAvatarURL({
					size: 512,
					dynamic: true,
					format: 'png'
				})
			)
			.setTitle(`Detected lang : ${languages[l]}`)
			.addField('your text!', '```' + q + '```')
			.addField(lang, '```' + translated.text + '```')
			.setColor('RANDOM')
			.setFooter(message.author.username, message.author.displayAvatarURL());
		m.edit({embeds: [resEmbed], content: "translated:"});
	}
};
