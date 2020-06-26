var express = require('express');
var multer  = require('multer');
var router = express.Router()
var validate=require('../validate/user.validate');
var controller=require('../controllers/user.controller')
router.get('/',controller.index);
router.get('/profile',controller.profile);
router.get('/profile/avatar',controller.avatar);
var upload = multer({ dest: './uploads/' });
router.post('/profile/avatar',upload.single('avatar'),controller.postAvatar);
router.post('/profile',controller.postInfo);
router.get('/create',controller.create)
router.post('/create',validate.postCreate,controller.postCreate)
router.get('/:id',controller.getUser)
router.get('/:id/delete',controller.delete);
router.get('/:id/update',controller.update);
router.post('/:id/update',controller.postUpdate);
module.exports = router