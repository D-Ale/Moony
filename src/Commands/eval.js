/**@format */
const Command = require("../Structures/Command.js");
const { inspect } = require("util");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "eval",
  permission: "SEND_MESSAGES",
  description: "Eval",
  type: "TEXT",

  async run(message, args, client) {
    let hex = ["A586E1", "86E1E1", "8695E1", "E186D9", "AF86E1"];

    let hex_r = hex[Math.floor(Math.random() * hex.length)];

    let color = `#${hex_r}`;

    if (
      ![
        "585979754604396544",
        "780952231780286484",
        "722883309763559466",
      ].includes(message.author.id)
    ) {
      return message.reply(
        new MessageEmbed()
          .setDescription("Error | Who tf are you?")
          .setColor(color)
          .setTimestamp()
      );
    }

    const evaled_cmd = args.join(" ");

    if (!evaled_cmd)
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setDescription("Error | Are you kidding?")
            .setColor(color),
        ],
      });

    try {
      if(message.content.includes("token")) return;
      const evaled = eval(evaled_cmd);

      let success = new MessageEmbed()
        .setColor(color)
        .setTitle("Succesfully Evaluated")
        .addFields(
          {
            name: "Type",
            value: `\`\`\`prolog\n${typeof evaled}\`\`\``,
            inline: true,
          },
          {
            name: "Evaled in",
            value: `\`\`\`yaml\n${
              Date.now() - message.createdTimestamp
            } ms\`\`\``,
            inline: true,
          },
          { name: "Entry", value: `\`\`\`js\n${evaled_cmd}\`\`\`` },
          {
            name: "Exit",
            value: `\`\`\`js\n${inspect(evaled, { depth: 0 })}\`\`\``,
          }
        )
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL());

      message.reply({ embeds: [success] });
    } catch (error) {
      let error_c = new MessageEmbed()
        .setColor("DARK_RED")
        .setTitle("Error")
        .addFields(
          { name: "Entry", value: `\`\`\`js\n${evaled_cmd}\`\`\`` },
          { name: "Error", value: `\`\`\`js\n${error}\`\`\`` }
        );
      message.reply({ embeds: [error_c] });
    }
  },
});
