let Discord = require("discord.js");
let config = require(__dirname + "/../../config.json");

let name = "eval"
let usage = `${config.prefix}${name} <code>`
let description = "Evaluates the given code. Can only be used by vKredGod"

module.exports.run = async (bot, message, args) => {
  
}

module.exports.info = {
  name: name,
  usage: usage,
  description: description
};