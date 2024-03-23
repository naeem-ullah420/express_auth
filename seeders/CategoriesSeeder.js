const Category = require("../models/Categroy")


const CategoriesSeeder = async () => {

    await Category.deleteMany({})

    let categories = [
        {"name": "electronics"},
        {"name": "clothing"},
        {"name": "fashion"},
        {"name": "cars"},
    ]

    await Category.insertMany(categories)

    console.log("Categories Seeded")
}


module.exports = CategoriesSeeder