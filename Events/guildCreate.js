const Discord = require("discord.js")
const config = require("../config.json")
const fs = require("fs")
const Guild = require("../models/guild.js")
const mongoose = require("mongoose")


module.exports.run = async (bot, guild) => {
    if (!guild.available) return console.log("An error occurred while joining a guild.")

    let guildID = guild.id;
    let channelID;
    let channels = guild.channels;
    channelLoop:
    for (let c of channels) {
      let channelType = c[1].type;
      if (channelType === "text") {
          channelID = c[0];
          break channelLoop;
      }
    }

    let channel = bot.channels.get(guild.systemChannelID || channelID);
    channel.send("", {
	      embed: new Discord.RichEmbed()
		      .setTitle("Hey, thanks for inviting me!")
		      .setDescription(`Hey, I'm pixel. I'm a moderation bot with many functionalities! To see a list of commands, type ${config.prefix}help. See you around!`)
		      .setColor("#4292f4")
  })

    let server = new Guild({
        _id: mongoose.Types.ObjectId(),
        guildName: guild.name,
        guildID: guild.id,
        guildOwnerId: guild.ownerID,
        guildBotPrefix: "$",
        guildMemberCount: guild.memberCount,
        guildWhitelist: false,
        guildCommandsBlacklist: [],
        guildDefaultRole: null
    })

    server.save()

    console.log(`Joined guild ${guild.name}`)
}
