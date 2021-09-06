/**@format */
const Command = require('../Structures/Command.js')
const Discord  = require('discord.js')

module.exports = new Command({
    name: "skip",
    description: "Skips Songs",
    permission: "CONNECT",
    async run(message, args, client){

        client.distube.skip(message)

        message.reply(`Song Skipped`)
        
    }
})