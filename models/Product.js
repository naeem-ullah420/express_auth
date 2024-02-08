const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: String,
    category_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'categories'
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
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