const mongoose = require('mongoose')

const connect_mongodb = () => {
    return new Promise((res, rej) => {
        mongoose.connect(process.env.MONGO_CONNECTION_URI)
        .then(() => {
            console.log("mongodb connected")
            res(true)
        })
        .catch((err) => {
            console.log("Failed to connect mongodb ", err)
            rej(true)
        })
    })
    
}

module.exports = connect_mongodb