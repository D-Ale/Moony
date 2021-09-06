const Command = require('../Structures/Command')
const Discord = require('discord.js')
module.exports = new Command({
    name: "avatar",
    description: "Shows the avatar of x user",
    usage: "avatar <id/user>",
    permission: "SEND_MESSAGES",
    async run(message, args, client) {
        let usuario;

        let hex = ["A586E1", "86E1E1", "8695E1", "E186D9", "AF86E1"];

    let hex_r = hex[Math.floor(Math.random() * hex.length)];

    let color = `#${hex_r}`;


    if (message.mentions.members.first()){
        usuario = message.mentions.members.first().id

        let user = await client.users.fetch(usuario)
   
        const embed = new Discord.MessageEmbed()
       .setTitle(`${user.tag}'s Avatar`)
       .setColor(color)
       .setImage(user.displayAvatarURL({size: 4096,dynamic: true}))
       .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true})) 
       message.reply({ embeds: [embed]}) 

    }else if (args[0]) {

        usuario = args[0];

        try{
          let user = await client.users.fetch(usuario)
   
          const embed = new Discord.MessageEmbed()
         .setTitle(`${user.tag}'s Avatar`)
         .setColor(color)
         .setImage(user.displayAvatarURL({size: 4096,dynamic: true}))
         .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true})) 
         message.reply({ embeds: [embed]}) 
         }catch{
   
         const err = new Discord.MessageEmbed()
         .setAuthor(client.user.username,client.user.displayAvatarURL())
         .setTitle(`Error! ❌`)
         .setColor('RED')
         .setDescription(`${args[0]} No es una ID valida, asegurate de que sea de un usuario!`)
         message.reply({ embeds: [err]})
   
         }
    }else if(!args[0]){
        usuario = message.author.id;

        let user = await client.users.fetch(usuario)

        const embed = new Discord.MessageEmbed()
       .setTitle(`${user.tag}'s Avatar`)
       .setColor(color)
       .setImage(user.displayAvatarURL({size: 4096,dynamic: true}))
       .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true})) 
       message.reply({ embeds: [embed]})
       
    }   
    }
})