/**@format */
const { MessageActionRow, MessageButton, MessageEmbed, DiscordAPIError } = require('discord.js')
const Command = require('../Structures/Command.js')
const Discord  = require('discord.js')

module.exports = new Command({
    name: "x-invite",
    permissions: "SEND_MESSAGES",
    description: "Invites an x Bot",

    async run(message, args, client) {

        const mention_x = message.mentions.users.first() 

        if (!mention_x) return message.reply("Mention a Bot.")

        if (!mention_x.bot) return message.reply("Mention a **Bot**.")

        const row_x = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle("LINK")
                    .setLabel(`${mention_x.username}'s Invite`)
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${mention_x.id}&permissions=8&scope=bot`)
            )

        const embed_x = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`${mention_x.username}'s Invite`)
            .setAuthor(mention_x.username, mention_x.displayAvatarURL())

        message.reply({
            embeds: [embed_x],
            components: [row_x]
        })
    }
})