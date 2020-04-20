var express = require('express');

const favoriteController=require('../controllers/FavoriteController')
const authenticateOwner=require('../middlewares/authenticateOwner');
const findUser = require('../middlewares/findUser');
const jwtMiddleware=require('express-jwt');
const secrets=require('../config/secrets');

let router=express.Router();

router.route('/')
.get(jwtMiddleware({secret:secrets.jwtSecret}),findUser,favoriteController.index)
.post(favoriteController.create);

router.route('/:id')
.delete(favoriteController.find,authenticateOwner,favoriteController.destroy);

module.exports=router;