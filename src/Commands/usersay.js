const Command = require('../Structures/Command.js')
const Discord = require('discord.js');

module.exports = new Command({
  name: "usersay",
  description: "Fake say about an user",
  permission: "SEND_MESSAGES",
  usage: "usersay <user> <text>",

 async run (message, args, client) {
 
    let text;
  
   let usuario = message.mentions.users.first()

   if(!usuario){
        text = args.join(" ");

        if(!text) return

        let nombre = message.author.username;

        message.delete()

        message.channel.fetchWebhooks().then(async webhooks => {

            let encontrar = await webhooks.find(webhooks => webhooks.name === nombre)
        
            if(encontrar){
              
              encontrar.send(args.join(' '));
        
             }else{
        
               let creado = await message.channel.createWebhook(nombre,{ avatar: 
              usuario.displayAvatarURL() })
        
              creado.send(args.join(' '))
        
             
             }     
           })

   } else {
    text = args.slice(1).join(" ")

    if(!text) return;

   message.delete()

   let nombre = usuario.username;

   message.channel.fetchWebhooks().then(async webhooks => {

    let encontrar = await webhooks.find(webhooks => webhooks.name === nombre)

    if(encontrar){
      
      encontrar.send(args.slice(1).join(' '));

     }else{

       let creado = await message.channel.createWebhook(nombre,{ avatar: 
      usuario.displayAvatarURL() })

      creado.send(args.slice(1).join(' '))

     
     }
         
   })
 }

 }
})