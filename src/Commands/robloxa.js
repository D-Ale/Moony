/**@format */
const { MessageEmbed } = require('discord.js')
const Command = require('../Structures/Command.js')
const Discord = require('discord.js')

module.exports = new Command({
    name: "robloxa",
    permissions: "SEND_MESSAGES",
    description: "Searchs a roblox user's avatar",
    
    async run(message, args, client) {

        const idk = args[0]

        if(!idk) return message.reply("Mention a Roblox username")

        let url = `http://www.roblox.com/Thumbs/Avatar.ashx?x=420&y=420&Format=Png&username=${idk}`
        
        let avatar = new MessageEmbed()
        .setImage(url)//Muestra el avatar.
        message.reply({
            embeds: [avatar]
        });
    }
})