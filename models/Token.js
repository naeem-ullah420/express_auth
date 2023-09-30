const mongoose = require('mongoose')

const TokenSchema = new mongoose.Schema({
    token: String,
    user_id: mongoose.Schema.ObjectId
}, {
    timestamps: true
})

const Token = mongoose.model("tokens", TokenSchema)

module.exports = Token