const { handleTicketSystem } = require("../../util/handlers/ticketHandler")
module.exports = async(client, interaction) => {
    await handleTicketSystem(client, interaction)
}