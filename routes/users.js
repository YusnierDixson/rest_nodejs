const express = require('express');
const router = express.Router();

const usersController=require('../controllers/UserController');

router.route('/').post(usersController.create);

module.exports = router;
