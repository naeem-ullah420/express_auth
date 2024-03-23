const Product = require("../models/Product")
const fs = require('fs')

const createProduct = async (req, res) => {
    const body    = req.body
    const product = await Product.create({
        name        : body.name,
        description : body.description,
        price       : body.price,
        category_id : body.category_id,
        image       : req.file.filename,
        user_id     : req.auth_user._id
    })
    return res.json({
        "message":"product created successfully",
        "data": {
            "product": await product.populate('category_id')
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
    const search = req.query?.search
    const category_id = req.query?.category_id
    const product_id = req.query?.product_id
    console.log("search: ", search)

    let query = {}

    if(search) {
        query = {
            "$or": [
                {name: {$regex: search, $options: 'i'}},
                {description: {$regex: search, $options: 'i'}},
            ]
        }
    }

    if(category_id) {
        query['category_id'] = category_id
    }
    
    if(product_id) {
        query['_id'] = product_id
    }

    const products_count = await Product.find(query).count()
    const page = Number(req.query.page ? req.query.page : 1);
    const per_page = 10
    const offset = (page * per_page) - per_page 
    const total_pages = Math.ceil(products_count/per_page)

    const products = await Product.find(query).sort('-createdAt').skip(offset).limit(per_page).populate('category_id')
    return res.json({
        "message": "products fetched successfully",
        "data": {
            "current_page": page,
            "total_count": products_count,
            "total_pages": total_pages,
            "products": products,
        }
    })
}



module.exports = {
    createProduct,
    readProducts,
    deleteProduct
}