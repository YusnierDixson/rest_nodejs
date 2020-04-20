const express = require('express');
const router = express.Router();

const usersController=require('../controllers/UserController');
const sessionsController=require('../controllers/SessionController');

router.route('/')
.post(
  usersController.create,
  sessionsController.generateToken,
  sessionsController.sendToken)


module.exports = router;
