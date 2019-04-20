let Discord = require("discord.js");
let config = require(__dirname + "/../../config.json");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('KICK_MEMBERS')) {
      return message.channel.send("Hey " + message.member + ", you don't have permissions to use this!");
    }
      let user = message.mentions.users.first()
    if (user) {
        let reason = args.slice(1).join(" ") 
        let guild = bot.guilds.get(message.guild.id);
        let member = message.guild.member(user);

            if (member) {
            member.kick(`Kicked by ${message.author.tag}. Reason: ${reason}`).then((member) => {
                message.channel.send(`:wave: User ${user.tag} was kicked.`);
            }).catch(err => {
                message.channel.send("An error has occurred. Maybe I don't have the right permissions, or the user has a higher role.");
            });
           } else {

          message.channel.send("Sorry, I could not find any user with that name!");
      }
    } else {
        message.channel.send("", {
	      embed: new Discord.RichEmbed()
		      .setTitle("Command usage:")
		      .setDescription(``)
		      .setColor("#4292f4")
  })
    }
}
module.exports.info = {
    name: "kick"
}
