const Discord = require("discord.js");
const intents = new Discord.Intents(32767);
const Command = require("./Command.js");
const Event = require("./Event.js");
const fs = require("fs");
const config = require("../Data/config.json");
const chalk = require("chalk");
const { table, createStream } = require("table");
const Distube = require("distube");
let { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const YouTubeTogether = require("youtube-together.js");
const { DiscordTogether } = require('discord-together')
class Client extends Discord.Client {
  constructor() {
    super({ intents, allowedMentions: { repliedUser: false } });

    /**
     * @type {Discord.Collection<string, Command>}
     */
    this.commands = new Discord.Collection();

    this.distube = new Distube.DisTube(this, {
      emitNewSongOnly: true,
      leaveOnEmpty: true,
      leaveOnFinish: true,
      leaveOnStop: true,
      searchSongs: 10,
      nsfw: true,
      plugins: [new SpotifyPlugin(), new SoundCloudPlugin()],
    });
    this.yt = new DiscordTogether(this)

    let hex_color = ["A586E1", "86E1E1", "8695E1", "E186D9", "AF86E1"];

    let h_random = hex_color[Math.floor(Math.random() * hex_color.length)];

    this.hex = h_random;

    this.prefix = config.prefix;

    this.onwer = config.ownersID;
  }

  start(token) {
    const commandFiles = fs
      .readdirSync("./src/Commands")
      .filter((file) => file.endsWith(".js"));
    /**
     * @type {Command[]}
     */
    const commands = commandFiles.map((file) => require(`../Commands/${file}`));

    commands.forEach((cmd) => {
      console.log(`Command ${cmd.name} in Category ${cmd.category} loaded`); //aqui se hace un console.log que imprima la tabla en la terminal

      this.commands.set(cmd.name, cmd); // y ps eso :v
    });

    const slashCommands = commands
      .filter((cmd) => ["BOTH", "SLASH"].includes(cmd.type))
      .map((cmd) => ({
        name: cmd.name.toLowerCase(),
        description: cmd.description,
        permissions: [],
        options: cmd.slashCommandOptions,
        defaultPermission: true,
      }));

    this.removeAllListeners();

    this.on("ready", async () => {
      const data = [["COMMANDS", "STATUS", "DESCRIPTION"]];

      const config = {
        header: {
          alignment: "center",
          content: "SLASH COMMANDS",
        },
      };

      const cmds = await this.application.commands.set(slashCommands);

      cmds.forEach((cmd) => {
        console.log(`Slash ${cmd.name} loaded`);
      });
    });

    fs.readdirSync("./src/Events")
      .filter((file) => file.endsWith(".js"))
      .forEach((file) => {
        /**
         * @type { Event }
         */

        const event = require(`../Events/${file}`);

        console.log(
          chalk.red("[EVENT HANDLER]") +
            " " +
            chalk.black("Event") +
            " " +
            chalk.blackBright(`${event.event}`) +
            " " +
            chalk.hex("#DE7DDC").bold("loaded")
        );

        this.on(event.event, event.run.bind(null, this));
      });
    this.login(token);
  }
}

module.exports = Client;
