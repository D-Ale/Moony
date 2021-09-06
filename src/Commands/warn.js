const Command = require('../Structures/Command.js')
const megadb = require('megadb')
const warns = new megadb.crearDB("warns-x")

module.exports = new Command({
    name: "warn",
    permissions: "KICK_MEMBERS",
    description: "Warns an user.",
    category: "Staff",
    async run(message, args, client){

        let x_user = message.mentions.users.first()

        if(!x_user) return message.reply(`Mention an user`)

        if(x_user.id === message.author.id) return message.reply(`Do you want to warn yourself?`)

        if(x_user.bot) return message.reply("Mention an **Human**.")

        let x_reason = args.slice(1).join(" ")

        if(!x_reason){
            x_reason = "No reason was Provided"
        }
        warns.set(`${message.guild.id}`, `${x_user.id, x_reason}`)

        message.reply(`${x_user.tag} was warned by: *${x_reason}*`)

        x_user.send(`You were warned in **${message.guild.name}** by: *${x_reason}*`)

    }
})