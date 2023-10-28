require('dotenv').config()

const express = require('express')
const connect_mongodb = require("./utilities/mongodb_connection")
const authRouter = require("./routes/auth")
const cors = require('cors')
const productRouter = require("./routes/product")
const app = express()

// static files
app.use("/uploads",express.static('uploads'))

// cors handling
app.use(cors())

// json payload
app.use(express.json())

// routes namespaces
app.use("/api/auth", authRouter)
app.use("/api/product", productRouter)

// fallback route
app.all("*", (req, res) => {
    return res.status(404).json({
        "message":"route not found"
    })
})

// mongodb connection
connect_mongodb()

// up the server
app.listen(process.env.PORT, ()=>{
    console.log("Listening on " + process.env.BACKEND_URL)
})