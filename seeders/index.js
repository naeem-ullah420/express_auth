require('dotenv').config()

const categorySeeder = require("./CategorySeeder")
const connect_mongodb = require("../utilities/mongodb_connection")



connect_mongodb().then(() => {
    categorySeeder()
})