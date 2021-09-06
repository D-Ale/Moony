const Command = require('../Structures/Command.js')
const { MessageEmbed } = require('discord.js');
const db = require("megadb")
const muterol = new db.crearDB("muterol")

module.exports = new Command({
    name: "setmuterol",
    description: "Sets the mute rol of x server",
    permission: "ADMINISTRATOR",
    async run(message, client, args){

        let rol = message.mentions.roles.first()

        if(!rol) return message.channel.send({ embeds: [new MessageEmbed() .setDescription(`<:_x_:831681570158673970>  Debes mencionar un rol!`) .setColor("#920da9") .setTitle("Algo ha fallado")]})

        muterol.establecer(message.guild.id, rol.id)

        message.reply( {embeds: [ new MessageEmbed() .setDescription(`<a:bien_galaxy:873119897771708436> **Mute Rol Creado/Actualizado** 
    Rol: **<@&${rol.id}>**`) .setColor("#920da9")]})
    }

})
