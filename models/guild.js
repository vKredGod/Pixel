const mongoose = require("mongoose")

let guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildName: String,
    guildID: String,
    guildOwnerId: String,
    guildBotPrefix: String,
    guildMemberCount: Number,
    guildWhitelist: Boolean,
    guildCommandsBlacklist: [String],
    guildDefaultRole: String
})

module.exports = mongoose.model("Guild", guildSchema)