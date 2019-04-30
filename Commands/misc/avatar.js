let Discord = require("discord.js");
let config = require(__dirname + "/../../config.json");
let Enmap = require('enmap')

module.exports.run = async (bot, message, args) => {
    if (!args[0]) {
        let avatarEmbed = new Discord.RichEmbed()
            .setTitle(`Your avatar`)
            .setImage(message.author.displayAvatarURL)
            .setColor("#00d800")

        return await message.channel.send(avatarEmbed)
    }

    let user = message.mentions.members.first()

    if (user) { 
        let avatarEmbed = new Discord.RichEmbed()
            .setTitle(`${user.user.username}'s avatar.`)
            .setImage(user.user.displayAvatarURL)
            .setColor("#00d800")
        return await message.channel.send(avatarEmbed)
    } else {
        await message.channel.send(":x: Sorry, I couldn't find that user.")
    }
}
module.exports.info = {
  name: "avatar",
  usage: ["avatar"],
  description: "Sends the user profile picture."
};
