var express = require('express');

const visitController=require('../controllers/VisitController')
const authenticateOwner=require('../middlewares/authenticateOwner');
const placesController=require('../controllers/PlaceController')


let router=express.Router();

router.route('/:id/visits')
.get(placesController.find,visitController.index)
.post(placesController.find,visitController.create);

router.route('/:id/visits/:visit_id')
.delete(visitController.find,authenticateOwner,visitController.destroy);

module.exports=router;