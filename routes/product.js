const express = require('express')
const productRouter = express.Router()
const checkTokenMiddleware = require('../middlewares/checkToken')
const validateProductCreateRequest = require("../requests/productCreateRequest")
const {GridFsStorage} = require('multer-gridfs-storage');

// configuring multer
const multer  = require('multer')
const { createProduct } = require("../controllers/ProductController")
const { readProducts } = require("../controllers/ProductController")
const { deleteProduct } = require("../controllers/ProductController")
const validateProductDeleteRequest = require("../requests/productDeleteRequest")
const checkProductMiddleware = require("../middlewares/checkProduct")

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//       console.log(file)
//       const extension = file.mimetype.split("/")[1]
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
//     }
// })

// Set up GridFS storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_CONNECTION_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const extension = file.mimetype.split("/")[1]
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const filename = file.fieldname + '-' + uniqueSuffix + '.' + extension
    return {
      bucketName: 'uploads',  // Bucket name in MongoDB
      filename: filename  // Use original file name as the stored file name
    };
  }
});

const upload = multer({ storage: storage })

productRouter.post("/create", [checkTokenMiddleware, upload.single("image"), validateProductCreateRequest] , createProduct)

productRouter.get("/read", [checkTokenMiddleware], readProducts)

productRouter.post("/delete", [checkTokenMiddleware, validateProductDeleteRequest, checkProductMiddleware], deleteProduct)



module.exports = productRouter
