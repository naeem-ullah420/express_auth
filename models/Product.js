const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    user_id: mongoose.Schema.ObjectId,
    price: {
        type: Number,
        default: 0,
    },
    rating:{
        type: Number,
        default: 0,
        min:0,
        max: 5,
    },
}, {timestamps: true})


const Product = mongoose.model("products", ProductSchema)

module.exports = Product