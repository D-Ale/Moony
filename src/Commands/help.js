/**@format */
const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const { MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = new Command({
  name: "help",
  permission: "SEND_MESSAGES",
  description: "Help Command",
  type: "TEXT",

  async run(message, args, client) {
    let hex = ["A586E1", "86E1E1", "8695E1", "E186D9", "AF86E1"];

    let hex_r = hex[Math.floor(Math.random() * hex.length)];

    let color = `#${hex_r}`;

    let links;

    if (hex_r === "A586E1") {
      links =
        "https://cdn.discordapp.com/attachments/780099412671987734/883136084660351047/standard_2.gif";
    } else if (hex_r === "86E1E1") {
      links =
        "https://cdn.discordapp.com/attachments/780099412671987734/883136867866935326/standard_3.gif";
    } else if (hex_r === "8695E1") {
      links =
        "https://cdn.discordapp.com/attachments/780099412671987734/883138364453322832/standard_4.gif";
    } else if (hex_r === "E186D9") {
      links =
        "https://cdn.discordapp.com/attachments/780099412671987734/883134856782049341/standard_1.gif";
    } else if (hex_r === "AF86E1") {
      links =
        "https://cdn.discordapp.com/attachments/780099412671987734/883136084660351047/standard_2.gif";
    }

    let command_t = client.commands.size;

    if (!args[0]) {
      const embed = new Discord.MessageEmbed()

        .addFields({
          name: "・Music (4)・<a:musicc:883105956400099361>",
          value: "`c.play` `c.skip` `c.queue` `c.stop`",
        })
        .setColor(color);

      const embed2 = new Discord.MessageEmbed()

        .addFields({
          name: "・Staff (3)・<a:shieldd:873009241655488623>",
          value: "`c.warn` `c.mute` `c.ban`",
        })
        .setColor(color);

      const embed3 = new Discord.MessageEmbed()

        .addFields({
          name: "・Util (8)・<a:util:881573127086284871>",
          value: "`・c.ping` `c.robloxa` `c.tread` `c.togheter` `c.invite-x` `c.avatar` `c.say` `c.botinfo`",
        })
        .setColor(color);

      const embed4 = new Discord.MessageEmbed()

        .addFields({
          name: "・Fun (2)・<:pikagun:872950941131890738>",
          value: "`・c.cheems` `c.usersay`",
        })
        .setColor(color);


      const main_embed = new Discord.MessageEmbed()
        //.setDescription(`Mira todos mis Comandos en este mensaje, aquí puedes obtener sobre los mismos comandos con \`\`\` c.help <comando> \`\`\` Las Categorias Disponibles son\`\`\` Utilidad con 10 Comandos\`\`\` Tambien esta \`\`\` Música con 7 comandos \`\`\``)
        .setDescription(
          `<:hu:881309954726850580> ` +
            "`" +
            "|" +
            "`" +
            ` Hola **${message.author.username}**! Mi nombre es **${client.user.username}** Este es el listado completo de todos mis comandos, no olvides que si tienes alguna Duda/Problema/Sugerencia, puedes visitar el [servidor de soporte <3](https://discord.gg/D5NvKyytpM)`
        )
        .addFields(
          { name: "・Prefijos", value: " > ・`c.`・Prefijo Universal" },
          {
            name: "・¿Buscas informacion de algun comando? Utiliza",
            value: " > ・`c.help <comando>`",
          },
          {
            name: "・Total de Comandos",
            value: "> " + "・" + "`" + command_t + "`",
          },
          {
            name: "_ _ _ _",
            value: "`・------------------------------------------・`",
          }
        )
        .setThumbnail(client.user.avatarURL({ dynamic: true }))
        .setImage(links)
        .setColor(`#${hex_r}`);

      const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("select")
          .setPlaceholder("Nothing selected")
          .addOptions([
            {
              label: "Music Commands",
              emoji: "873003174913527808",
              description: "Do you want to listen music with me?",
              value: "1",
            },
            {
              label: "Moderation Commands",
              emoji: "873009241655488623",
              description: "I will help you to protect your server",
              value: "2",
            },
            {
              label: "Utility Commands",
              emoji: "881573127086284871",
              description: "Nothing important",
              value: "3",
            },
            { 
              label: "Fun Commands",
              emoji: "872950941131890738",
              description: "I will make you laugh",
              value: "4"
            },
          ])
      );

      let msg = await message.reply({
        embeds: [main_embed],
        components: [row],
      });

      const filter = (interaction) => !interaction.user.bot;

      const col = await msg.createMessageComponentCollector({
        filter,
        time: 30000,
      });

      col.on("collect", async (menu) => {
        

        if (menu.values[0] === "1") {
          await menu.deferReply({ ephemeral: true });

          await menu.followUp({
            embeds: [embed],
          });
        }
        if (menu.values[0] === "2") {
          await menu.deferReply({ ephemeral: true });

          await menu.followUp({
            embeds: [embed2],
          });
        }
        if (menu.values[0] === "3") {
          await menu.deferReply({ ephemeral: true });

          await menu.followUp({
            embeds: [embed3],
          });
        }
        if (menu.values[0] === '4') {
          await menu.deferReply({ ephemeral: true });
          
          await menu.followUp({
            embeds: [embed4]
          })
        }
      });

      col.on("end", async (menu) => {
        await msg.reply("The menu is now closed");
      });
    }

    const x_cmd_args = args[0];

    const cmd =
      client.commands.get(x_cmd_args) ||
      client.commands.find((x) => x.name == x_cmd_args);

    if (!cmd) return;

    if (!cmd.usage.startsWith("c.")) {
      cmd.usage = `c.${cmd.usage}`;
    }

    let data = [];

    const x_cmd = new Discord.MessageEmbed()
      .setDescription("**Command Info**")
      .setColor(color)
      .setFooter(
        `Requested by: ${message.author.tag}`,
        message.author.displayAvatarURL()
      )
      .setTimestamp();

    data.push({
      embeds: [x_cmd.addField("Name", `\`\`\` c.${cmd.name} \`\`\``)],
    });

    data.push({
      embeds: [
        x_cmd.addField("Description", `\`\`\` ${cmd.description} \`\`\``),
      ],
    });

    data.push({
      embeds: [x_cmd.addField("Perms", `\`\`\` ${cmd.permission} \`\`\``)],
    });

    data.push({
      embeds: [x_cmd.addField("Usage", `\`\`\` ${cmd.usage} \`\`\``)],
    });

    message.reply({ data, embeds: [x_cmd] });
  },
});
