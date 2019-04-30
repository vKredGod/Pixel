let Discord = require("discord.js");
let Enmap = require('enmap')

module.exports.run = async (bot, member) => {
    let defaultRole = bot.guildSettings.get(member.guild.id, "defaultRole")
    let role = member.guild.roles.find(role => role.name === defaultRole);

    if (!role) return;

    member.addRole(role)
}
