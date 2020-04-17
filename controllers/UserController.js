const User=require('../models/User');

const buildParams= require('./helpers').buildParams;

const validParams=['email','name','password'];
function create(req,res,next) {
    let params=buildParams(validParams,req.body);
    User.create(params).then(user=>{
         req.user=user;
          next();
    }).catch(error=>{
        console.log(error);
        res.status(422).json({
            error
        })
        
    })
}


module.exports={create};