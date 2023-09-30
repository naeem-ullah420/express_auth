const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profile_picture: String
})

const User = mongoose.model("users", UserSchema)

module.exports = User