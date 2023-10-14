const Product = require("../models/Product")
const Token = require("../models/Token")

const checkProductMiddleware = async (req, res, next) => {
    const { product_id } = req.body

    const product = await Product.findOne({
        _id: product_id,
        user_id: req.auth_user._id,
    })


    if(product) {
        req.product = product
        return next()
    }

    return res.status(403).json({
        "message": "Invalid request id given"
    })
}


module.exports = checkProductMiddleware