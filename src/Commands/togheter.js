const Command = require("../Structures/Command.js"); //Mi handler :v


const Discord = require("discord.js");

module.exports = new Command({
    name: "together", //Mi handler :v
    description: "Youtube Toghether Activity", //Mi handler :v
    permission: "CONNECT", //Mi handler :v
    async run(message, args, client) {
        
        let colors = ["A586E1", "86E1E1", "8695E1", "E186D9", "AF86E1"] //Ponemos los colores que quieras en un array

        let random_colors = colors[Math.floor(Math.random() * colors.length)]//Hacemos un Math.random para que de un color aleatorio de los que elejimos
        
        let hex = `#${random_colors}`
        
        if(!message.member.voice.channel) return;

        let channelID = message.member.voice.channel.id

        client.yt.createTogetherCode(channelID, 'youtube')
        .then((x) => message.channel.send(`${x.code}`))
    }
});