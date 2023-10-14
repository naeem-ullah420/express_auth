require('dotenv').config()

const express = require('express')
const connect_mongodb = require("./utilities/mongodb_connection")
const authRouter = require("./routes/auth")
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRouter)

// mongodb connection
connect_mongodb()

app.listen(process.env.PORT, ()=>{
    console.log("Listening on " + process.env.BACKEND_URL)
})