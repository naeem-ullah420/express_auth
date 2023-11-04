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
}, {timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})

ProductSchema.virtual('image_url').get(function() {
    return `${process.env.BACKEND_URL}/uploads/${this.image}`;
});


const Product = mongoose.model("products", ProductSchema)


module.exports = Product