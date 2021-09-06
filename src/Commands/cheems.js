/**@format */
const Command = require('../Structures/Command.js')

module.exports = new Command({
    name: "cheems",
    permissions: "SEND_MESSAGES",
    description: "Cheemsifica tu Oración",
    async run(message, args, client) {

        const idk = args.join(" ") 

        if(!idk) return;
        
        let cheems = idk
        .split("a").join("am")

        .split("e").join("em")

        .split("i").join("im")

        .split("o").join("om")

        .split("u").join("um")

        message.reply(cheems)
        
    }
        
})