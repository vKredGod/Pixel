let Discord = require("discord.js");
let config = require(__dirname + "/../../config.json");
let Enmap = require('enmap')

module.exports.run = async (bot, message, args) => {
    if (message.author.id !== message.guild.ownerID) return message.channel.send("I'm sorry, only owners can use this command.")

    let commandDescription = new Discord.RichEmbed() 
    .setTitle(`Command: ${this.info.name}`)
    .addField(`Usage: `, `${this.info.usage.join("\n")}`)
    .addField(`Description: `, `${this.info.description}`)
    .setColor("#4292f4")

    if (args[0]) {
        if (typeof args[0] !== "string") return message.channel.send("Please define a valid prefix.") 
        bot.guildSettings.set(message.guild.id, args.join(' '), "prefix")
        message.channel.send("Done! The new prefix was set to " + args.join(' ') + ".")
    } else {
        message.channel.send("Please specify a prefix!")
    }
}
module.exports.info = {
  name: "setprefix",
  usage: ["setprefix <prefix>"],
  description: "Sets the specified prefix as default prefix for the server."
};
