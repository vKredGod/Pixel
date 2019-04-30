let Discord = require("discord.js");
let config = require(__dirname + "/../../config.json");
let Enmap = require('enmap')

module.exports.run = async (bot, message, args) => {
    if (message.author.id !== message.guild.ownerID) return message.channel.send("Only the owner of the server can use this command!")

    let commandDescription = new Discord.RichEmbed()
        .setTitle(`Command: ${this.info.name}`)
        .addField(`Usage: `, `${this.info.usage.join("\n")}`)
        .addField(`Description: `, `${this.info.description}`)
        .setColor("#4292f4");

    if (args[0]) {
        switch (args[0]) {
            case "set": 
                let roleName = args.slice(1).join(" ")
                let role = message.guild.roles.find(role => role.name === roleName);
        
                if (!role) {
                    return message.channel.send(":x: I'm sorry, I couldn't find that role.")
                } else {
                    bot.guildSettings.set(message.guild.id, role.name, "defaultRole")
                    return message.channel.send(":white_check_mark: The default role was set to " + bot.guildSettings.get(message.guild.id, "defaultRole"))
                }
            case "remove": 
                bot.guildSettings.set(message.guild.id, "", "defaultRole")
                return message.channel.send(":white_check_mark: Default role was removed.")
            default:
                return message.channel.send(commandDescription)
        }
        
    } else {
        return message.channel.send(commandDescription) 
    }
}
module.exports.info = {
  name: "defaultrole",
  usage: ["defaultrole set <role>", "defaultrole remove"],
  description: "Adds the given role when a new user joins."
};
