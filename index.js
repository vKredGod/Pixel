const Discord = require("discord.js")
const config = require("./config.json")
const fs = require("fs")
const mongoose = require("mongoose")

const bot = new Discord.Client({disableEveryone: true})
bot.commands = new Discord.Collection();
mongoose.connect(`mongodb://${config.dbip}:${config.dbport}/${config.dbname}`,  {useNewUrlParser: true});

let categories = ['moderation', 'settings'];

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
    bot.on(eventName, (args) => event.run(bot, args))
  })
})

bot.on('ready', () => {
  console.log("Ready")
})

bot.on('message', message => {
  if (message.author.bot) return;
  if (config.dm=="disabled" && message.channel.type=="dm") return;

  let prefix = config.prefix;
  let msgArray = message.content.split(" ");
  let cmd = msgArray[0];
  let args = msgArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);
})

bot.login(config.token)
