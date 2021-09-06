const Command = require("../Structures/Command.js"); //Mi handler :v


const Discord = require("discord.js");

module.exports = new Command({
    name: "embede", //Mi handler :v
    description: "Shows an embed", //Mi handler :v
    permission: "SEND_MESSAGES", //Mi handler :v
    async run(message, args, client) {
        
        let colors = ["A586E1", "86E1E1", "8695E1", "E186D9", "AF86E1"] //Ponemos los colores que quieras en un array

        let random_colors = colors[Math.floor(Math.random() * colors.length)]//Hacemos un Math.random para que de un color aleatorio de los que elejimos
        
        let hex = `#${random_colors}`
        
        const r = new Discord.MessageEmbed() //Estructura del embed

            .setDescription("Colores Aleatorios")
            .setTimestamp()
            .setColor(hex) // Aquí ponemos lo que definimos antes, los colores random 

        message.reply({
            embeds: [r] //Enviamos el embed, si eres v12 solo haz un message.channel.send(r)
        })
        
        //DISCORD.GG/DIURNOS
    
    }
});