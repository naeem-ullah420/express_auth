require('dotenv').config()

const connect_mongodb = require("../utilities/mongodb_connection");
const CategoriesSeeder = require("./CategoriesSeeder");


connect_mongodb().then(()=> {
    CategoriesSeeder()
})
