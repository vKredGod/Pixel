let Discord = require("discord.js");
let Enmap = require('enmap')

module.exports.run = async (bot, channel) => {
        await channel.overwritePermission(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
        })
}
