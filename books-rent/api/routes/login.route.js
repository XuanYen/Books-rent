var express = require('express');
var router = express.Router()
var controller=require('../controllers/login.controller')

router.post('/login',controller.postLogin);
module.exports = router