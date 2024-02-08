const Category = require("../models/Category")
const Product = require("../models/Product")


const readCategories = async (req, res) => {

    let categories = await Category.find({})

    let all_categories = []
    
    for(let category of categories) {
        all_categories.push({
            _id: category._id,
            name: category.name,
            product_count: await Product.find({category_id: category._id}).count(),
        })
    }



    return res.json({
        "message": "categories fetched successfully",
        "data": {
            "categories": all_categories,
        }
    })
}



module.exports = {
    readCategories,
}