const Token = require("../models/Token")

const checkTokenMiddleware = async (req, res, next) => {
    if(req.headers.token) {
        const token = await Token.findOne({
            token: req.headers.token
        }).populate('user_id')
        if(token) {
            req.auth_user = token.user_id
            return next()
        }
    }
    return res.status(401).json({
        "message": "you are not authorized to perform this action"
    })
}


module.exports = checkTokenMiddleware