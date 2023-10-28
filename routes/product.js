const express = require('express')
const productRouter = express.Router()
const checkTokenMiddleware = require('../middlewares/checkToken')
const validateProductCreateRequest = require("../requests/productCreateRequest")

// configuring multer
const multer  = require('multer')
const { createProduct } = require("../controllers/ProductController")
const { readProducts } = require("../controllers/ProductController")
const { deleteProduct } = require("../controllers/ProductController")
const validateProductDeleteRequest = require("../requests/productDeleteRequest")
const checkProductMiddleware = require("../middlewares/checkProduct")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const extension = file.mimetype.split("/")[1]
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
    }
})

const upload = multer({ storage: storage })

productRouter.post("/create", [checkTokenMiddleware, upload.single("image"), validateProductCreateRequest] , createProduct)

productRouter.get("/read", [checkTokenMiddleware], readProducts)

productRouter.post("/delete", [checkTokenMiddleware, validateProductDeleteRequest, checkProductMiddleware], deleteProduct)

module.exports = productRouter
