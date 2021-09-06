const Command = require('../Structures/Command.js')
const Discord = require("discord.js")
const moment = require("moment")
require("moment-duration-format")

module.exports = new Command({
    name: "botinfo",
    description: "Shows info about me",
    permission: "SEND_MESSAGES",
    async run(message, args, client){

    const actividad = moment
      .duration(client.uptime)
      .format(" D [dias], H [hrs], m [mins], s [secs]")

      const botinfo = new Discord.MessageEmbed()
      .setAuthor(`Bot Info`, client.user.avatarURL())
      .setThumbnail(client.user.avatarURL({ size: 2048 }))
      .setDescription("Info about Me.")
      .addField("Servers: ", "```diff\n- " + client.guilds.cache.size + "\n```", true)
      .addField("Uptime: ", "```\n" + actividad + "\n```", true)
      .addField(
        "RAM: ",
        "```fix\n" +
          (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) +
          "MB\n```",
        true
      )
      .addField("Lang: ", '```json\n"JavaScript"\n```', true)
      .addField("Module: ", "```ini\n[Discord.js v13.1.0]\n```", true)
      .addField("Devs", "```\n[ValacClara#0720, D'Ale 🗕 🗗 🗙#6969]\n```")
      .setColor("DARK_VIVID_PINK")

      message.reply({ embeds: [botinfo]})
    }
    
})