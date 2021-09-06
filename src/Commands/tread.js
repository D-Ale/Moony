/**@format */
const Command = require("../Structures/Command.js");
const chalk = require("chalk");

module.exports = new Command({
  name: "tread",
  permissions: "SEND_MESSAGES",
  description: "Creates a tread",
  category: "Staff",

  async run(message, args, client) {
    const idk = args.join(" ");

    if (!idk) return message.reply("Set a Tread name");

    const thread = await message.channel.threads.create({
      name: `${idk}`,
      autoArchiveDuration: 60,
      reason: "Needed a separate thread for food",
    });

    console.log(
      chalk.magenta(`Created thread: ${thread.name}`) +
        " " +
        chalk.red(`Author: ${message.author.tag}`)
    );
  },
});
