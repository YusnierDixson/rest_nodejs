var express = require('express');

const favoriteController=require('../controllers/FavoriteController')
const authenticateOwner=require('../middlewares/authenticateOwner');
const jwtMiddleware=require('express-jwt');
const secrets=require('../config/secrets');

let router=express.Router();

router.route('/')
.get(jwtMiddleware({secret:secrets.jwtSecret}),favoriteController.index)
.post(favoriteController.create);

router.route('/:id')
.delete(favoriteController.find,authenticateOwner,favoriteController.destroy);

module.exports=router;