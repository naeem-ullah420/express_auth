const mongoose = require('mongoose')

const connect_mongodb = () => {
    mongoose.connect(process.env.MONGO_CONNECTION_URI)
    .then(() => {
        console.log("mongodb connected")
    })
    .catch((err) => {
        console.log("Failed to connect mongodb ", err)
    })
}

module.exports = connect_mongodb