
const words = ['fire', 'draw', 'shoot', 'bang', 'pull', 'boom'];

module.exports = {
        name: 'gunfight',
        aliases: [''],
        category: 'Games',
        examples: ["gunfight @dream"],
        usage: '[mention | username | nickname | ID]',
        description: 'Engage In A Gunfight Against Another User',

    execute: async (bot, message, args, ops) => {
        if (!args[0]) return message.channel.send("**Please Enter A User To Play With!**")
      
        let opponent = await client.resolvers.resolveMember({
          message,
          search: args.join(" ")
        })
        if (!opponent) return message.channel.send("**Please Enter A Valid User!**")
        if (opponent.user.bot) return message.channel.send('**Cannot Fight Bots!**');
if (opponent.user.id === message.author.id) return message.channel.send('**Cannot Fight Yourself!**');
        const current = ops.games.get(message.channel.id);
        if (current) return message.channel.send(`**Please Wait Until The Current Game of \`${current.name}\` is Finished!**`);
        ops.games.set(message.channel.id, { name: 'gunfight' });
        try {
            let msg = await message.channel.send(`**${opponent}, Do You Accept This Challenge?\nType: yes/y to accept else no/n**`);
            const verification = await client.functions.verify(msg, message.author, 30000);
            if (verification === "NO") {
                ops.games.delete(message.channel.id);
                return message.channel.send(`**Looks like ${opponent} Doesnt Wants To Play!**`);
            }
            await message.channel.send('**Get Ready, Game Will Start At Any Moment!**');
            await client.functions.delay(client.functions.randomRange(1000, 10000));
            const word = words[Math.floor(Math.random() * words.length)];
            await message.channel.send(`TYPE \`${word.toUpperCase()}\` NOW!`);
            const filter = res => [opponent.user.id, message.author.id].includes(res.author.id) && res.content.toLowerCase() === word.toLocaleLowerCase();
            const winner = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000
            });
            ops.games.delete(message.channel.id);
            if (!winner.size) return message.channel.send('**Nobody Won!*');
            return message.channel.send(`**The Winner is ${winner.first().author}!**`);
        } catch (err) {
            ops.games.delete(message.channel.id);
            throw err;
        }
    }
};