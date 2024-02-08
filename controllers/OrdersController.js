const CartProduct = require("../models/CartProduct")

const readOrders = async (req, res) => {
    console.log(req.auth_user._id)
    const orders = await CartProduct.find({
        'user_id': req.auth_user._id
    })

    return res.json({
        "message" : "orders fetched successfully",
        "orders"  : orders
    })
}

module.exports = {
    readOrders
}