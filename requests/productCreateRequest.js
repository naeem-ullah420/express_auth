const Joi = require('joi');

const productRequestSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.string().required(),
    category_id: Joi.string().required(),
})

const validateProductCreateRequest = (req, res, next) => {
    const { error, value } = productRequestSchema.validate(req.body);
    if(error) {
        return res.status(400).json({
            "message": error.details[0].message.replace('"', '').replace('"', '')
        })
    }
    next()
}

module.exports = validateProductCreateRequest