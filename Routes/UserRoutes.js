const express=require('express')
const Router = express.Router()
const Usercontroller = require('../Controllers/Usercontroller')
const verifyToken = require('../src/Middlewares/VerifyToken')

Router.post('/register',Usercontroller.RegisterController)
Router.post('/login',Usercontroller.LoginController)
Router.get('/',verifyToken.VerifyToken,Usercontroller.LoginIn)

module.exports=Router;
