/** @format */

const Command = require("../Structures/Command");

module.exports = new Command({
	name: "ban",
	description: "Ban users",
	type: "SLASH",
	slashCommandOptions: [{
		name: "target",
		description: "User",
		type: "USER",
		required: true
	},
    {
        name: "reason",
        description: "The reason for this ban",
        type: "STRING",
        required: true
    },
    {
        name: "messages",
        description: "Choose one of this choices",
        type: "STRING",
        required: true,
        choices: [
            {
                name: "Don't delete any",
                value: "0"
            },
            {
                name: "Previous 7 days",
                value: "7"
            }
        ]
    }
    ],
	permission: "BAN_MEMBERS",
	async run(message, args, client) {
		
        const user = message.options.getMember("target")

        if(user.id === message.member.id) return message.reply("You can't ban yourself")

        const reason = message.options.getString('reason')

        if(reason.lenght > 512) return message.reply("The reason can't exceed 512 characters")

        const msgs = message.options.getString('messages')

        user.ban({ days: msgs, reason: reason})

        message.reply(`${user.username} got banned by you.`)
	}
});
