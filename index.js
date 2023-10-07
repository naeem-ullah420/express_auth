const express = require('express')
const { connect_mongodb } = require("./utilities/mongodb_connection")
const auth_routes = require("./routes/auth")
const app = express()

app.use(express.json())

// mongodb connection
connect_mongodb()

// routes
app.use("/api/auth", auth_routes)

app.listen(8000, ()=>{
    console.log("Listening on http://localhost:8000")
})