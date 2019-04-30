const Discord = require("discord.js")
const config = require("../config.json")
const fs = require("fs")
const Enmap = require("enmap")
const defaultSettings = require("../Utilities/defaultSettings.js")

module.exports.run = async (bot, guild) => {
    bot.guildSettings.delete(guild.id)
    console.log(`Left guild ${guild.name}`)
}