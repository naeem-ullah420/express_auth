const express = require('express')
const connect_mongodb = require("./utilities/mongodb_connnection")
const authRouter = require("./routes/auth")

const app = express()

app.use(express.json())
app.use("/api/auth", authRouter)

// mongodb connection
connect_mongodb()

app.listen(8000, ()=>{
    console.log("Listening on http://localhost:8000")
})