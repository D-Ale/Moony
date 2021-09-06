/**@format */

const Client = require("./Structures/Client.js");

const client = new Client();

const config = require("./Data/config.json");
const { MessageEmbed } = require("discord.js");

client.distube.on("searchResult", async (message, results) => {
  let hex = ["A586E1", "86E1E1", "8695E1", "E186D9", "AF86E1"];

  let hex_r = hex[Math.floor(Math.random() * hex.length)];

  let msg = new MessageEmbed()
    .addField(
      "Choose and option below",
      `\n${results
        .map(
          (song, i) =>
            `**${i + 1}**. ${song.name} - \`${song.formattedDuration}\``
        )
        .join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`
    )
    .setColor(`#${hex_r}`);
  message.reply({ embeds: [msg] });
});

client.distube.on("searchCancel", (message) =>
  message.channel.send(`Searching canceled`)
);

client.distube.on("searchInvalidAnswer", (message) =>
  message.channel.send(`Searching Invalid Song :D`)
);

client.distube.on("searchDone", () => {});

client.distube.on("addSong", async (queue, song) => {
  let hex = ["A586E1", "86E1E1", "8695E1", "E186D9", "AF86E1"];

  let hex_r = hex[Math.floor(Math.random() * hex.length)];

  const play = new MessageEmbed()
    .setTitle(`Playing Song`)
    .setDescription(
      `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}.`
    )
    .setColor(`#${hex_r}`)
    .setThumbnail(song.thumbnail);
  queue.textChannel.send({ embeds: [play] });
});

client.distube.on("addList", async (queue, playlist) => {
  queue.textChannel.send(
    `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to the queue!`
  );
});
const status = (queue) =>
  `Volume: \`${queue.volume}%\` | Loop: \`${
    queue.repeatMode
      ? queue.repeatMode == 2
        ? "Server Queue"
        : "This Song"
      : "Off"
  }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

client.distube.on("playSong", async (queue, song) => {
  let hex = ["A586E1", "86E1E1", "8695E1", "E186D9", "AF86E1"];

  let hex_r = hex[Math.floor(Math.random() * hex.length)];

  const play = new MessageEmbed()
    .setTitle(`Playing Song`)
    .addFields(
      { name: "Song Name:", value: `${song.name}` },
      { name: "Likes:", value: `${song.likes}` },
      { name: "Views:", value: `${song.views}`, inline: true },
      { name: "Duration:", value: `${song.formattedDuration}`, inline: true }
    )
    .setColor(`#${hex_r}`)
    .setImage(song.thumbnail);
  queue.textChannel.send({ embeds: [play] });
});

client.distube.on("searchNoResult", (message, query) =>
  message.channel.send(`No result found for ${query}!`)
);

client.distube.on("empty", (queue) => {
  queue.textChannel.send(`Queue empty, leaving channel.`);
});

client.distube.on("error", (channel, error) => {
  channel.send("An error encountered: " + error);

  console.log(error);
});

client.start(config.token);

process.on("unhandledRejection", async (rej) => {
  console.log(rej);
});

//A
