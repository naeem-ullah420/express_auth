const stripe = require('stripe')('sk_test_51JqBzkJQatz8KWO4Pfyva25rIdGCl2admyuZaCkCzoHa6KN26KDp4NqRzupeNcLmOr0toVbahN9axjv6WDuBUEOJ00IdkkYKRP');
const _ = require('lodash');
const Product = require('../models/Product');
const CartProduct = require('../models/CartProduct');

const createPaymentIntent = async (req, res) => {

    const { cart_items } = req.body

    let product_ids = _.map(cart_items, 'product_id')

    let products = JSON.parse(JSON.stringify(await Product.find({
        '_id': {'$in': product_ids}
    })))

    let complete_cart = cart_items.map(item => {
        const product = _.find(products, {'_id': item.product_id})
        return {
            ...product,
            'quantity' : item.quantity,
        }
    })

    let total_price = complete_cart.reduce((prev, curr) => {
        return prev + (curr.price * curr.quantity)
    }, 0)


    const payment_intent_response = await stripe.paymentIntents.create({
        amount: total_price * 100,
        currency: 'usd',
        payment_method_types: ['card'],
    });


    await CartProduct.create({
        'user_id': req.auth_user._id,
        'user_email': req.auth_user.email,
        'products': complete_cart,
        'total_price': total_price,
        'payment_intent_response': payment_intent_response,
    })



    return res.json({
        "message": "categories fetched successfully",
        "data": {
            "complete_cart"           : complete_cart,
            "total_price"             : total_price,
            "payment_intent_response" : {
                "id"                   : payment_intent_response.id,
                "amount"               : payment_intent_response.amount / 100,
                "payment_method_types" : payment_intent_response.payment_method_types,
                "status"               : payment_intent_response.status,
                "currency"             : payment_intent_response.currency,
                "client_secret"        : payment_intent_response.client_secret,
                "capture_method"       : payment_intent_response.capture_method,
                "amount_received"      : payment_intent_response.amount_received,
            },
        }
    })
}


// stripe listen --forward-to localhost:8000/api/payment/webhook
const stripeWebhooks = async (req, res) => {

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    } catch (err) {
        console.log(`Webhook Error: ${err.message}`)
        res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    switch (event.type) {
      case 'charge.succeeded':
        const chargeSucceeded = event.data.object;
        const paymentIntentId = chargeSucceeded['payment_intent']
        await CartProduct.findOneAndUpdate({'payment_intent_response.id': paymentIntentId}, {
            '$set':{
                'charge_succeeded' : chargeSucceeded,
                'paid_status'     : true
            }
        })
        console.log("Charge Succeeded")
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.send();
}


module.exports = {
    createPaymentIntent,
    stripeWebhooks,
}