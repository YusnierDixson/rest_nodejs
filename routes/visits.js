var express = require('express');

const visitController=require('../controllers/VisitController')
const authenticateOwner=require('../middlewares/authenticateOwner');
const jwtMiddleware=require('express-jwt');
const secrets=require('../config/secrets');

let router=express.Router();

router.route('/')
.get(jwtMiddleware({secret:secrets.jwtSecret}),visitController.index)
.post(visitController.create);

router.route('/:visit_id')
.delete(visitController.find,authenticateOwner,visitController.destroy);

module.exports=router;