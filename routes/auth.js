const express = require('express')
const AuthController = require("../controllers/AuthController")
const auth_routes = express.Router()
const validateSignUpRequest = require('../requests/signUpRequest')
const validateLoginRequest = require('../requests/loginRequest')
const emailAlreadyExistsMiddleware = require('../middlewares/emailAlreadyExists')
const checkTokenMiddleware = require('../middlewares/checkToken')

auth_routes.post("/signup", [validateSignUpRequest, emailAlreadyExistsMiddleware], AuthController.signUp)

auth_routes.post("/login",[validateLoginRequest], AuthController.login)

auth_routes.post("/forgotPassword", AuthController.forgotPassword)

auth_routes.post("/resetPassword/:token", AuthController.resetPassword)

auth_routes.get("/readProfile",[checkTokenMiddleware], AuthController.readProfile)

module.exports = auth_routes