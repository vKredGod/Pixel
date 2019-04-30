let Discord = require("discord.js");
let config = require(__dirname + "/../../config.json");
let ms = require("ms");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(
      "Hey " + message.member + ", you don't have permissions to use this!"
    );

  let commandDescription = new Discord.RichEmbed()
    .setTitle(`Command: ${this.info.name}`)
    .addField(`Usage: `, `${this.info.usage.join("\n")}`)
    .addField(`Description: `, `${this.info.description}`)
    .setColor("#4292f4");

  let member = message.mentions.members.first();

  if (args.length == 0) return await message.channel.send("", commandDescription);

  if (!member)
    return await message.channel.send(
      "I'm sorry, I couldn't find any user with that name."
    );
  let username = member.user.tag
  let bannedBy = message.author.tag
  let muteRole = message.guild.roles.find(`name`, "muted")

  if (!muteRole) {
      try {
        muteRole = await message.guild.createRole({
            name: "muted",
            color: "#000000",
            permissions: []
        })  
        message.guild.channels.forEach(async (channel) => {
            await channel.overwritePermission(muteRole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            })
        })
      } catch (e) {
          console.log(e.stack)
      }
  }
    
  if (member.hasPermission("ADMINISTRATOR") || member.hasPermission("MANAGE_MESSAGES")) 
    return await message.channel.send(
      "I couldn't mute this user. Maybe I don't have permissions or the user has a higher role."
    );

  if (args[args.length - 2] == "-d") {
    let input = args;
    let duration = input[input.length - 1];
    input.pop();
    input.pop();
    let reason = input.slice(1);
  } else {
    await member.addRole(muteRole)
    await message.delete()
    await message.channel.send(`:hammer: Member ${username} was muted.`).then(msg => {
      msg.delete(3500)
    })
  }
};
module.exports.info = {
  name: "mute",
  description: "Mutes the mentioned user for the specified ammount of time. Mute will last forever if no time is given.",
  usage: ["mute <user> [reason]", "mute <user> [reason] -d [duration]"]
};
