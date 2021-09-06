/**@format */
const Command = require('../Structures/Command.js')
const Discord = require('discord.js')
const { MessageActionRow, MessageSelectMenu } = require('discord.js')
const config = require('../Data/config.json')

module.exports = new Command({
    name: "destroy",
    permissions: "SEND_MESSAGES",
    description: "Destroys me",
    type: "BOTH",
    slashCommandOptions: [],

    async run(message, args, client) {

        
        message.channel.send("Succesfully Reloaded").then(() => {
            client.destroy().then(() => {
                process.exit(); 
            });
        }); 

    }
})