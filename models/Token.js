const mongoose = require('mongoose')

const TokenSchema = new mongoose.Schema({
    token: String,
    token_type: {
        type: String,
        default: "login_token"
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
}, {
    timestamps: true,
})

const Token = mongoose.model("tokens", TokenSchema)

module.exports = Token