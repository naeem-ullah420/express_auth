const mongoose = require('mongoose')

const connect_mongodb = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/express_auth")
    .then(() => {
        console.log("mongodb connected")
    })
    .catch((err) => {
        console.log("Failed to connect mongodb ", err)
    })
}


module.exports = connect_mongodb