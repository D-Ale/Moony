/**@format */
const Command = require('../Structures/Command.js')
const Discord  = require('discord.js')

module.exports = new Command({
    name: "play",
    description: "Plays Songs",
    permission: "CONNECT",
    usage: "c.play <song>",
    async run(message, args, client){

        if(!args.join(" ")) return message.reply("Search Something")

        if(!message.member.voice.channel) return message.reply("You have to be in a VC Channel")

        if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply("You have to be in the same vc than me")

        client.distube.play(message, args.join(" "))
        
    }
})