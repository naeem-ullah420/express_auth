const Token = require("../models/Token")

const checkResetPasswordToken = async (req, res, next) => {
    if(req.params.token) {
        const token = await Token.findOne({
            token: req.params.token,
            token_type:'forgot_password_token',
            createdAt: {'$gt': new Date(Date.now() - 10 * 60 * 1000)},
        }).populate('user_id')
        if(token) {
            console.log("valid token")
            req.auth_user = token.user_id
            return next()
        }
    }
    return res.status(401).json({
        "message": "Invalid or expired token"
    })
}


module.exports = checkResetPasswordToken