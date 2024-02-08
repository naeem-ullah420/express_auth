const Category = require("../models/Category")

const categorySeeder = async () => {
    await Category.deleteMany({})
    
    let categories = [
        {"name": "electronics"},
        {"name": "clothing"},
        {"name": "fashion"},
        {"name": "cars"},
    ]

    await Category.insertMany(categories)

    console.log("Categories seeded")
}

module.exports = categorySeeder