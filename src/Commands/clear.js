/** @format */

const Command = require("../Structures/Command.js");

module.exports = new Command({
	name: "clear",
	description: "Clear an amount of messages",
	permission: "MANAGE_MESSAGES",
	category: "Staff",
	async run(message, args, client) {
		const amount = args[0];

		if (!amount || isNaN(amount))
			return message.reply(
				`${
					amount == undefined ? "Nothing" : amount
				} is not a valid number!`
			);

		const amountParsed = parseInt(amount);

		if (amountParsed > 100)
			return message.reply("You cannot clear more than 100 messages!");

		message.channel.bulkDelete(amountParsed);

		const msg = await message.reply(
			`Cleared ${amountParsed} messages!`
		);

		

		if (msg) setTimeout(() => msg.delete(), 5000);
	}
});
