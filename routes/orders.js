const express = require('express')
const checkTokenMiddleware = require('../middlewares/checkToken')
const { readOrders } = require('../controllers/OrdersController')
const ordersRouter = express.Router()

ordersRouter.get("/read", [checkTokenMiddleware], readOrders)

module.exports = ordersRouter
