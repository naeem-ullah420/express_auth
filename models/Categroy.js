const mongoose = require('mongoose')

const CategoriesSchema = new mongoose.Schema({
    name: String
}, {
    timestamps: true,
})

const Category = mongoose.model("categories", CategoriesSchema)

module.exports = Category