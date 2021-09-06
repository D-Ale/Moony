/**@format */
const Command = require('../Structures/Command.js')

module.exports = new Command({
    name: "ping",
    description: "Shows The ping of The Bot",
    type: "SLASH",
    slashCommandOptions: [],
    permission: "SEND_MESSAGES",
    
    async run(message, args, client) {

        message.reply(`Ping: ${client.ws.ping} ms`)


    }
})