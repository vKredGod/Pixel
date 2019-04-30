let Discord = require("discord.js");
let config = require(__dirname + "/../../config.json");
let defaultSettings = require(__dirname + "/../../Utilities/defaultSettings.js")


module.exports.run = async (bot, message, args) => {
  if (message.author.id !== message.guild.ownerID) return message.channel.send("Only the owner of the server can use this command!")

  let warningEmbed = new Discord.RichEmbed() 
    .addField(`:warning: Warning :warning: `, ` \nThis will reset the settings for this guild, please confirm this action with the command 'resetsettings confirm'. `)
    .setColor("#ff7b00")

  if (args[0] && args[0] == "confirm") {
    bot.guildSettings.delete(message.guild.id)
    bot.guildSettings.ensure(message.guild.id, defaultSettings)

    let timeTaken = new Date() - message.createdAt
    message.channel.send(":white_check_mark: Done! Took " + timeTaken + "ms")
  } else {
    message.channel.send(warningEmbed)
  }
}
module.exports.info = {
  name: "resetsettings",
  usage: ["resetsettings <confirm>"],
  description: "Resets the settings for the guild. Only server owners can use this command."
};