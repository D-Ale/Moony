/**@format */
const Command = require('../Structures/Command.js')
const Discord  = require('discord.js')

module.exports = new Command({
    name: "stop",
    description: "Stops Songs",
    permission: "CONNECT",
    async run(message, args, client){

        client.distube.stop(message)

        message.reply(`Queue Stopped`)
        
    }
})