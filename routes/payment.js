const express = require('express')
const checkTokenMiddleware = require('../middlewares/checkToken')
const { createPaymentIntent,stripeWebhooks } = require('../controllers/PaymentController')
const paymentRouter = express.Router()

paymentRouter.post("/createPaymentIntent", [checkTokenMiddleware], createPaymentIntent)

paymentRouter.post("/webhook", express.raw({type: 'application/json'}), stripeWebhooks)

module.exports = paymentRouter
