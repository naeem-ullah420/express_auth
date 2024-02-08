const mongoose = require('mongoose')

const CartProductSchema = new mongoose.Schema({
    products : Array,
    total_price: Number,
    payment_intent_response: Object,
    charge_succeeded: Object,
    paid_status: Boolean,
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    user_email: String,
}, {timestamps: true})


const CartProduct = mongoose.model("cart_products", CartProductSchema)

module.exports = CartProduct