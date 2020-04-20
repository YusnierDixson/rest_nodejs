var express = require('express');

const favoriteController=require('../controllers/FavoriteController')
const authenticateOwner=require('../middlewares/authenticateOwner');

let router=express.Router();

router.route('/')
.post(favoriteController.create);

router.route('/:id')
.delete(favoriteController.find,authenticateOwner,favoriteController.destroy);

module.exports=router;