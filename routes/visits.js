var express = require('express');

const visitController=require('../controllers/VisitController')
const authenticateOwner=require('../middlewares/authenticateOwner');


let router=express.Router();

router.route('/')
.get(visitController.index)
.post(visitController.create);

router.route('/:visit_id')
.delete(visitController.find,authenticateOwner,visitController.destroy);

module.exports=router;