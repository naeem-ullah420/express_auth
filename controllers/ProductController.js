const Product = require("../models/Product")
const fs = require('fs')

const createProduct = async (req, res) => {
    const body    = req.body
    
    const product = await Product.create({
        name        : body.name,
        description : body.description,
        image       : req.file.filename,
        user_id     : req.auth_user._id,
        price       : body.price,
        category_id : body.category_id,
    })

    // console.log(req.file)

    return res.json({
        "message":"product created successfully",
        "data":{
            "product": {
                ...JSON.parse(JSON.stringify(await product.populate('category_id'))),
                'image_url': `${process.env.BACKEND_URL}/uploads/${product.image}` 
            }
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
    let query = {}

    if(req.query?.search) {
        query['name'] = {"$regex":req.query?.search, "$options":"i"}
    }

    if(req.query?.category_id) {
        query['category_id'] = req.query?.category_id
    }

    const per_page = 10
    const products_total_count = await Product.find(query).count()
    const current_page = Number(req.query?.page ? req.query.page : 1)
    const total_pages = Math.ceil(products_total_count / per_page)
    const offset = (current_page * per_page) - per_page

    const products = await Product.find(query).populate('category_id').limit(per_page).skip(offset).sort('-createdAt')

    return res.json({
        "message": "products fetched successfully",
        "data": {
            "pagination": {
                "per_page": per_page,
                "total": products_total_count,
                "current_page":current_page,
                "total_pages":total_pages,
            },
            "products": products.map(product => {
                return {
                    ...JSON.parse(JSON.stringify(product)),
                    'image_url': `${process.env.BACKEND_URL}/uploads/${product.image}`
                }
            }),
        }
    })
}



module.exports = {
    createProduct,
    readProducts,
    deleteProduct
}