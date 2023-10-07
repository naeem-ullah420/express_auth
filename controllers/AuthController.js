const { generateToken } = require("../helper")
const { verifyPassword } = require("../helper")
const { encryptPassword } = require("../helper")
const User = require("../models/User")
const Token = require("../models/Token")
const { sendMail } = require("../helper")


const signUp = async(req, res) => {
    console.log(req.body)
    try{
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: await encryptPassword(req.body.password),
        })
    } catch(err) {
        console.log(err)
    }
    return res.status(201).json({
        "message":"User Signed Up Successfully"
    })
}


const login = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({
        email: email,
    })

    if(user && await verifyPassword(user.password, password)) {

       let userToken = await Token.create({
            user_id: user._id,
            token: generateToken({email: user.email})
        })


        return res.status(200).json({
            "message": "login successfully",
            "token": userToken.token
        })
    } else {
        return res.status(400).json({
            "message": "Invalid Email/Password"
        })
    }
}


const forgotPassword = async (req, res) => {
    try{
        const {email} = req.body
        const user = await User.findOne({
            email: email
        })

        if(user) {
            const forgotPasswordToken = await Token.create({
                user_id: user._id,
                token_type:"forgot_password_token",
                token: generateToken({email: user.email})
            })
            const resetPasswordUrl = "http://localhost:8000/resetPassword/" + forgotPasswordToken.token
            const data = `<a href="${resetPasswordUrl}">${resetPasswordUrl}</a>`
            await sendMail("Click this link to reset password" + data, email)
        }

        return res.status(200).json({
            "message": "Email Sent Successfully"
        })

    } catch(err) {
        console.log("error", err)
    }

}


const resetPassword = async (req, res) => { 
    console.log(new Date(Date.now() - 10 * 60 * 1000))
    const token = await Token.findOne({
        token: req.params.token,
        createdAt: {'$gte': new Date(Date.now() - 10 * 60 * 1000)},
    })
    console.log(token)
    return res.send("Password reset successfully")
}

const readProfile = (req, res) => {
    return res.status(200).json({
        "message" : "user profile fetched successfully",
        "data": req.auth_user
    })
}

const AuthController = {
    signUp,
    login,
    forgotPassword,
    resetPassword,
    readProfile
}

module.exports = AuthController