var express = require('express');
var router = express.Router()
var controller=require('../controllers/cart.controller')

router.get('/',controller.index)
router.get('/add/:bookId',controller.addToCart);
router.get('/rent',controller.rent)
module.exports = router
