/**@format */
const Command = require('../Structures/Command.js')
const { MessageEmbed } = require('discord.js')
module.exports = new Command({
    name: "say",
    description: "Says whatever you want",
    permission: "SEND_MESSAGES",
    usage: "say <content/embed builder> | --embed",
    
    async run(message, args, client) {

        if(!args.join(" ")){
            let ee = new MessageEmbed()
                    .addField("Ocurrio un error", 'Asegurate de Escribir Algo!')        
                    .setColor("RED")
            message.reply({ embeds: [ee]})
        }
        
        
        if (message.content.endsWith('--embed')){
            try {
                let json = JSON.parse(args.join(' ').split('--embed')[0])
            
                message.channel.send({
                    embeds: [json],
                })
                } catch(error){
                    let embede = new MessageEmbed()
                    .addField("Ocurrio un error", 'Asegurate que el Formato sea Correcto, incluyendo comillas y signos\n Ejemplo `c.say { "title": "Titulo", "description": "Descripcion", "color": "#FFFFFF"}`')        
                    .setColor("RED")
                    message.reply({ embeds: [embede]})
                }
        } 
        if (!message.content.endsWith('--embed')){
         message.delete()
         message.channel.send(`${args.join(" ")}`)
                     
        } 

    }
})