const jwt=require('jsonwebtoken');
const secrets=require('../config/secrets');

function generateToken(req,res,next) {
    if(!req.user) return next();
    //Firmamos guardamos el ident del usuario y el token secreto en secrets.js
    req.token=jwt.sign({id: req.user._id},secrets.jwtSecret);
    next();
}

function sendToken(req,res) {
    if (req.user) {
        res.json({
            user:req.user,
            jwt:req.token
        })
        
    }else{
        res.status(422).json({
            error:'Could not create user'
        })
    }
}

module.exports={generateToken,sendToken}