require('dotenv').config()

const express = require('express')
const connect_mongodb = require("./utilities/mongodb_connection")
const authRouter = require("./routes/auth")
const cors = require('cors')
const productRouter = require("./routes/product")
const categoryRouter = require('./routes/category')
const paymentRouter = require('./routes/payment')
const ordersRouter = require('./routes/orders')
const Grid = require('gridfs-stream');
const mongoose = require('mongoose')
const app = express()

// static files
// app.use("/uploads",express.static('uploads'))


// Initialize gridfs-stream with mongoose connection
Grid.mongo = mongoose.mongo;
let gfs, gridFSBucket;
// mongodb connection
connect_mongodb().then(() => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads');
    gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection, {
        bucketName: "uploads",
    });
    console.log("gridFS Initialized")
})

app.get("/uploads/:filename", async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        res.setHeader("content-type", file.contentType);
        const readStream = gridFSBucket.openDownloadStream(new mongoose.Types.ObjectId(file._id));
        readStream.pipe(res);
    } catch (error) {
        console.log("Error: ", error)
        res.send("not found");
    }
});

// cors handling
app.use(cors())

// json payload
app.use(express.json({
    limit: '1050mb',
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    }
}))


// routes namespaces
app.use("/api/auth", authRouter)
app.use("/api/product", productRouter)
app.use("/api/categories", categoryRouter)
app.use("/api/payment", paymentRouter)
app.use("/api/orders", ordersRouter)

// fallback route
app.all("*", (req, res) => {
    return res.status(404).json({
        "message":"route not found."
    })
})

// up the server
app.listen(process.env.PORT, ()=>{
    console.log("Listening on " + process.env.BACKEND_URL)
})