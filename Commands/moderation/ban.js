let Discord = require("discord.js");
let config = require(__dirname + "/../../config.json");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission('BAN_MEMBERS'))
    return message.channel.send("Hey " + message.member + ", you don't have permissions to use this!");

    if (args.length >= 1) {
        let user = args[0];
        let reason = args.slice(1).join(" ")
        let guild = bot.guilds.get(message.guild.id);

        if (guild.member(message.mentions.users.first())) {
            let user = message.mentions.users.first();
            let member = message.guild.member(user);

            if (member) {
              if(!member.bannable) return message.channel.send("This user cannot be banned. Maybe he has a higher role?");
            member.ban("Kicked by pixel.").then((member) => {
                message.channel.send(`:hammer: User ${user.tag} was banned.`);
            }).catch(() => {
                message.channel.send("Hey, " + message.author + ", you don't have access to that command!");
            });
        }
        } else {
            message.channel.send("Sorry, I could not find any user with that name!");
        }
    } else {
        message.channel.send({embed: {
            color: 3447003,
            author: {
              name: bot.user.username,
              icon_url: bot.user.avatarURL
            },
            fields: [{
                name: "Command usage",
                value: "usage: <prefix>ban @<user>"
              },
              {
                name: "Description",
                value: "Kicks the user mentioned in the command."
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: bot.user.avatarURL,
              text: "© Pixel"
            }
          }
        });
    }
}
module.exports.info = {
    name: "ban"
}
