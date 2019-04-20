let Discord = require("discord.js");
let config = require(__dirname + "/../../config.json");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR'))
      return message.channel.send("Hey " + message.member + ", you don't have permissions to use this!");

    if (!fs.existsSync("/../../Servers")) fs.mkdirSync("/../../Servers")
}
module.exports.info = {
    name: "settings"
}
