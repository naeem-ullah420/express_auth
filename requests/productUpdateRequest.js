const Joi = require('joi');

const signUpRequestSchema = Joi.object({
    product_id: Joi.string().required(),
})

const validateProductUpdateRequest = (req, res, next) => {
    const { error, value } = signUpRequestSchema.validate(req.body);
    if(error) {
        return res.status(400).json({
            "message": error.details[0].message.replace('"', '').replace('"', '')
        })
    }
    next()
}

module.exports = validateProductUpdateRequest