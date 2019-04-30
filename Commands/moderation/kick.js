let Discord = require("discord.js");
let config = require(__dirname + "/../../config.json");

let name = "kick"
let usage = `kick <user> <reason>`
let description = "Kicks the mentioned user from the server."

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    return message.channel.send(
      "Hey " + message.member + ", you don't have permissions to use this!"
    );
  }
  let user = message.mentions.users.first();
  if (user) {
    let reason = args.slice(1).join(" ");
    let guild = bot.guilds.get(message.guild.id);
    let member = message.guild.member(user);

    if (member) {
      member
        .kick(`Kicked by ${message.author.tag}. Reason: ${reason}`)
        .then(member => {
          message.channel.send(`:wave: User ${user.tag} was kicked.`);
        })
        .catch(err => {
          message.channel.send(
            "An error has occurred. Maybe I don't have the right permissions, or the user has a higher role."
          );
        });
    } else {
      message.channel.send("Sorry, I could not find any user with that name!");
    }
  } else {
    let commandDescription = new Discord.RichEmbed()
        .setTitle(`Command: ${this.info.name}`)
        .addField(`Usage: `, `${this.info.usage.join("\n")}`)
        .addField(`Description: `, `${this.info.description}`)
        .setColor("#4292f4");
    message.channel.send(commandDescription)
  }
};
module.exports.info = {
  name: "kick",
  usage: [`kick <user> <reason>`, "test 2", "another test"],
  description: "Kicks the mentioned user from the server."
};
