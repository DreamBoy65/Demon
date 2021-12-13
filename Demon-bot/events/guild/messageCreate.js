const { handleCmd } = require(`${process.cwd()}/Demon-bot/util/handlers/cmdHandler`)
const { handleAfk } = require(`${process.cwd()}/Demon-bot/util/handlers/afkHandler`)
const { handleToxic } = require(`${process.cwd()}/Demon-bot/util/handlers/toxicHandler`)
const { handleMemes } = require(`${process.cwd()}/Demon-bot/util/handlers/memeHandler`)
const { handleChatbot } = require(`${process.cwd()}/Demon-bot/util/handlers/chatbotHandler`)
const { handleGlobalchat } = require(`${process.cwd()}/Demon-bot/util/handlers/globalchatHandler`)

module.exports = async (client, message) => {

    if(message.author.bot) return;

    //Commands.
    await handleCmd(client, message)

    //Afks.
    await handleAfk(client, message)

    //Anti-Toxic.
    await handleToxic(client, message)

    //Memes.
    await handleMemes(client, message)

    //ChatBot.
    await handleChatbot(client, message)

    //Global Chat.
    await handleGlobalchat(client, message)
  
};
