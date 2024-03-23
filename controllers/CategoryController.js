const Category = require("../models/Categroy")

const read = async (req, res) => {
    const categories = await Category.find({})

    return res.json({
        "message": "categories fetched successfully",
        "data":{
            "categories": categories
        }
    })
}


module.exports = {
    read
}