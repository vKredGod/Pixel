const Discord = require("discord.js")
const config = require("./config.json")
const fs = require("fs")
const bot = new Discord.Client({disableEveryone: true})
const Enmap = require("enmap")
bot.commands = new Discord.Collection();
bot.guildSettings = new Enmap({name: "settings"})
const defaultSettings = require("./Utilities/defaultSettings.js")

let categories = ['moderation', 'settings', 'developer', 'misc'];

if (!fs.existsSync("./Commands")) fs.mkdirSync("Commands");

categories.forEach(categorie => {
    if (!fs.existsSync("./Commands/"+categorie)) fs.mkdirSync("./Commands/"+categorie);
    fs.readdir("./Commands/"+categorie+"/", (err, _files) => {
        if (err) return console.log(err);
          _files.forEach(_file => {
              if (!_file.endsWith(".js")) return;
              let props = require(`./Commands/${categorie}/${_file}`);
              let commandName = props.info.name;
              bot.commands.set(commandName, props);
        })
    })
})

if (!fs.existsSync("./Events")) fs.mkdirSync("Events");
fs.readdir("./Events", (err, events) => {
  events.forEach(eventFile => {
    if (!eventFile.endsWith(".js")) return;
    let event = require("./Events/" + eventFile)
    let eventName = eventFile.split('.')[0]
    bot.on(eventName, (args, guild) => event.run(bot, args))
  })
})

bot.on('ready', () => {
  bot.user.setActivity('Work in progress!');
  console.log("Ready")
})

bot.on('message', async message => {
  if (message.author.bot) return;
  if (config.dm=="disabled" && message.channel.type=="dm") return;

  let guild = message.guild;
  let prefix = bot.guildSettings.get(message.guild.id, "prefix")
  if (message.content.split('')[0] !== bot.guildSettings.get(message.guild.id, "prefix")) return;
  let msgArray = message.content.split(" ");
  let cmd = msgArray[0];
  let args = msgArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);
})

bot.login(config.token)