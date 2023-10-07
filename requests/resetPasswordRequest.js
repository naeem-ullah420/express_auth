const Joi = require('joi');

const loginRequestSchema = Joi.object({
    password: Joi.string().required(),
    confirm_password: Joi.string().required().equal(Joi.ref('password')),
})

const validateResetRequest = (req, res, next) => {
    const { error, value } = loginRequestSchema.validate(req.body);
    if(error) {
        return res.status(400).json({
            "message": error.details[0].message.replace('"', '').replace('"', '')
        })
    }
    next()
}

module.exports = validateResetRequest