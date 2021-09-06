/**@format */
const Command = require('../Structures/Command.js')
const Discord  = require('discord.js')

module.exports = new Command({
    name: "queue",
    description: "Shows queue",
    permission: "CONNECT",
    async run(message, args, client){

        let hex = ["A586E1", "86E1E1", "8695E1", "E186D9", "AF86E1"]

        let hex_r = hex[Math.floor(Math.random() * hex.length)]

        let queue = client.distube.getQueue(message)

        if(!queue) return message.reply("This server doesn't have a queue")

        const que = new Discord.MessageEmbed()
        .setTitle("Queue")
        .setDescription("\n" + queue.songs.map((song, id) => `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``).slice(0, 10).join('\n'))
        .setColor(`#${hex_r}`)

        message.reply({ embeds: [que]})
    }
})