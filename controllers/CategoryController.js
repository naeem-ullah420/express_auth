const Category = require("../models/Categroy")
const Product = require("../models/Product")

const read = async (req, res) => {
    const categories = await Category.find({})

    let all_categories = []

    for(let category of categories) {
        all_categories.push({
            '_id': category._id,
            'name': category.name,
            'product_count': await Product.find({'category_id': category._id}).count()
            
        })
    }

    return res.json({
        "message": "categories fetched successfully",
        "data":{
            "categories": all_categories
        }
    })
}


module.exports = {
    read
}