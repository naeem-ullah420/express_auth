const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/User')
const emailAlreadyExistsMiddleware = require('./middlewares/emailAlreadyExists')
const { encryptPassword, verifyPassword, generateToken, sendMail } = require('./helper')

const validateSignUpRequest = require('./requests/signUpRequest')
const validateLoginRequest = require('./requests/loginRequest')
const Token = require('./models/Token')
const { checkTokenMiddleware } = require('./middlewares/checkToken')

const app = express()

app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/express_auth")
.then(() => {
    console.log("mongodb connected")
})
.catch((err) => {
    console.log("Failed to connect mongodb ", err)
})


app.post("/signup", [validateSignUpRequest, emailAlreadyExistsMiddleware] , async(req, res) => {
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
})


app.post("/login",[validateLoginRequest], async (req, res) => {
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
})



app.get("/readProfile", [checkTokenMiddleware], (req, res) => {
    return res.status(200).json({
        "message" : "user profile fetched successfully",
        "data": req.auth_user
    })
})


app.post("/forgotPassword", async (req, res) => {
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

})


app.post("/resetPassword/:token", async (req, res) => { 
    const token = await Token.findOne({
        token: req.params.token
    }).populate('user_id')
    console.log(token)
    return res.send("Password reset successfully")
})

app.listen(8000, ()=>{
    console.log("Listening on http://localhost:8000")
})