const express = require('express')
const checkTokenMiddleware = require('../middlewares/checkToken')
const { readCategories } = require('../controllers/CategoryController')
const categoryRouter = express.Router()

categoryRouter.get("/read", readCategories)

module.exports = categoryRouter
