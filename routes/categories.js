const express = require('express')
const { read } = require('../controllers/CategoryController')
const checkTokenMiddleware = require('../middlewares/checkToken')
const categoryRouter = express.Router()


categoryRouter.get('/read',[checkTokenMiddleware], [read])


module.exports = categoryRouter