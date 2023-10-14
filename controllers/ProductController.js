const Product = require("../models/Product")
const fs = require('fs')

const createProduct = async (req, res) => {
    const body    = req.body
    const product = await Product.create({
        name        : body.name,
        description : body.description,
        image       : req.file.filename,
        user_id     : req.auth_user._id
    })

    return res.json({
        "message":"product created successfully",
        "data":{
            "product": product
        }
    })
}

const deleteProduct = async(req, res) => {
    const product = req.product

    if(await Product.deleteOne({_id: req.body.product_id})) {
        fs.unlink("uploads/" + product.image, () => {})
        return res.json({
            "message":"product deleted successfully"
        })
    }

    return res.json({
        "message": "failed to delete product"
    })
}

const readProducts = async (req, res) => {
    const products = await Product.find({})

    return res.json({
        "message": "products fetched successfully",
        "data": {
            "products": products,
        }
    })
}



module.exports = {
    createProduct,
    readProducts,
    deleteProduct
}