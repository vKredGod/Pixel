let Discord = require("discord.js");
let config = require(__dirname + "/../../config.json");


module.exports.run = async (bot, message, args) => {
    let botPing = new Date() - message.createdAt
    let apiPing = bot.ping
    let pingEmbed = new Discord.RichEmbed() 
    .setTitle(`Ping infos:`)
    .addField(`Bot ping:`, `${botPing}ms`)
    .addField(`Api ping:`, `${apiPing}ms`)
    .setColor("#00bf09")

    return message.channel.send(``, pingEmbed)
}
module.exports.info = {
  name: "ping",
  usage: ["ping"],
  description: "Returns the bot ping and the Discord API ping."
};
