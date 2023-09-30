const User = require("../models/User")

const emailAlreadyExistsMiddleware = async (req, res, next) => {
    try {
       let user = await User.findOne({
            email: req.body.email
        })
        if(user) {
            return res.status(400).json({
                "message": "Email already exists"
            })
        }

        next()
    } catch (err) {
        console.log("error: ", err)
    }
    
}

module.exports = emailAlreadyExistsMiddleware