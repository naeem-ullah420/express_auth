const express = require('express')
const authRouter = express.Router()
const validateSignUpRequest = require('../requests/signUpRequest')
const validateLoginRequest = require('../requests/loginRequest')
const emailAlreadyExistsMiddleware = require('../middlewares/emailAlreadyExists')
const checkTokenMiddleware = require('../middlewares/checkToken')
const { signUp } = require("../controllers/AuthController")
const { login } = require("../controllers/AuthController")
const { forgotPassword } = require("../controllers/AuthController")
const { resetPassword } = require("../controllers/AuthController")
const { readProfile } = require("../controllers/AuthController")
const checkResetPasswordToken = require("../middlewares/checkResetPasswordToken")
const validateResetRequest = require("../requests/resetPasswordRequest")
const { logout } = require("../controllers/AuthController")

authRouter.post("/signup", [validateSignUpRequest, emailAlreadyExistsMiddleware] , signUp)

authRouter.post("/login",[validateLoginRequest], login)

authRouter.post("/forgotPassword", forgotPassword)

authRouter.post("/resetPassword/:token",[checkResetPasswordToken, validateResetRequest], resetPassword)

authRouter.get("/readProfile", [checkTokenMiddleware], readProfile)

authRouter.get("/logout", [checkTokenMiddleware], logout)

module.exports = authRouter