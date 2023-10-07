const Joi = require('joi');

const signUpRequestSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    confirm_password: Joi.string().required().equal(Joi.ref('password')),
})

const validateSignUpRequest = (req, res, next) => {
    const { error, value } = signUpRequestSchema.validate(req.body);
    if(error) {
        return res.status(400).json({
            "message": error.details[0].message.replace('"', '').replace('"', '')
        })
    }
    next()
}

module.exports = validateSignUpRequest