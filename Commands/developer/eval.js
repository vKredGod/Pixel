let Discord = require("discord.js");
let config = require(__dirname + "/../../config.json");

module.exports.run = async (bot, message, args) => {
  if (message.author.id !== config.ownerID) return;

  const clean = text => {
    if (typeof(text) === "string")
      return text.replace(`//g, "" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)`);
    else
        return text;
  }

  try {
    const code = args.join(" ");
    let evaled = eval(code);

    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }
}

module.exports.info = {
  name: "eval",
  usage: "eval <code>",
  description: "Runs the given code. Can only be used by vKredGod"
};