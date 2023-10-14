const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const signUpRequestSchema = Joi.object({
    product_id: Joi.objectId().required(),
})

const validateProductDeleteRequest = (req, res, next) => {
    const { error, value } = signUpRequestSchema.validate(req.body);
    if(error) {
        return res.status(400).json({
            "message": error.details[0].message.replace('"', '').replace('"', '')
        })
    }
    next()
}

module.exports = validateProductDeleteRequest