const jwt = require('jsonwebtoken')

//Authorization : Bearer Token

const VerifyToken = (req,res,next)=>{
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if(!token){
        return res.status(400).json({success:false,message:'Not found token'})
    }
    try {
        const decoded = jwt.verify(token,process.env.accessToken)
        req.userId = decoded.userId
        next()
    } catch (error) {
        res.status(403).json({success:false,message:'Invalid Token'})
        console.log(error)
    }
}

module.exports = {VerifyToken}