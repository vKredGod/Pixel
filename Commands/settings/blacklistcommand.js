let Discord = require("discord.js");
let config = require(__dirname + "/../../config.json");
let Enmap = require('enmap')

module.exports.run = async (bot, message, args) => {
    //This is probably the most badly organized code in this bot I mean who cares if it ain't broke don't fix it
    if (message.author.id !== message.guild.ownerID) return;

    let commandDescription = new Discord.RichEmbed()
        .setTitle(`Command: ${this.info.name}`)
        .addField(`Usage: `, `${this.info.usage.join("\n")}`)
        .addField(`Description: `, `${this.info.description}`)
        .setColor("#4292f4");
    let currentBlacklist
    if (args[0]) {
        let subcommand = args[0]
            if (subcommand == "set") {
                currentBlacklist = bot.guildSettings.get(message.guild.id, "disabledCommands")
                    if (!args[1]) return message.channel.send(":x: Please specify the command to blacklist.")

                message.channel.send(`:white_check_mark: The command ${args[1]} was disabled.`)
                currentBlacklist.push(args[1])
                bot.guildSettings.set(message.guild.id, currentBlacklist, "disabledCommands")
            } else if (subcommand == "remove") {
                currentBlacklist = bot.guildSettings.get(message.guild.id, "disabledCommands")
                    if (!currentBlacklist.includes(args[1])) return message.channel.send("That command isn't disabled.")
                message.channel.send(`The command ${args[1]} was removed from the blacklist`)
                let position = currentBlacklist.indexOf(args[1])
                currentBlacklist.splice(position, 1)
                bot.guildSettings.set(message.guild.id, currentBlacklist, "disabledCommands")
            } else if (subcommand == "list") {
                currentBlacklist = bot.guildSettings.get(message.guild.id, "disabledCommands")
                    if (currentBlacklist.length == 0) { 
                        message.channel.send("There aren't any commands on the blacklist.")
                    } else {
                        let disabledEmbed = new Discord.RichEmbed()
                            .addField("Disabled commands", currentBlacklist.join("\n"))
                            .setColor("#00d800")
                        message.channel.send(disabledEmbed)
                    }
            } else {
                message.channel.send(commandDescription)
            }
    } else {
        message.channel.send(commandDescription)
    }
}
module.exports.info = {
  name: "blacklistcommand",
  usage: ["blacklistcommand set <command>", "blacklistcommand remove <command>", "blacklistcommand list"],
  description: "Blacklists the given command. Can only be used by server owners."
};
