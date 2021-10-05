const Postcontroller = require('../Controllers/Postcontroller')
const express=require('express')
const Router = express.Router()
const verifyToken = require('../src/Middlewares/VerifyToken')

//Get to check login exist
Router.get('/',verifyToken.VerifyToken,Postcontroller.GetPost)
Router.post('/',verifyToken.VerifyToken,Postcontroller.Post)
Router.put('/:id',verifyToken.VerifyToken,Postcontroller.PutPost)
Router.delete('/:id',verifyToken.VerifyToken,Postcontroller.DeletePost)

module.exports = Router
