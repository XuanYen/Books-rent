var express = require('express');
var router = express.Router()
var controller=require('../controllers/user.controller')
router.get('/users',controller.index);
router.post('/users/create',controller.postCreate)
router.get('/users/:id',controller.getUser)
router.get('/users/:id/delete',controller.delete);
router.get('/users/:id/update',controller.update);
router.post('/users/:id/update',controller.postUpdate);
module.exports = router