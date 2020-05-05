var express = require('express');
var multer  = require('multer');

var validate=require('../validate/user.validate');
var controller=require('../controllers/user.controller')
var authMiddleware=require('../middleware/auth.middleware');
var upload = multer({ dest: './public/uploads/' });
//upload vao dau?
var router = express.Router()

router.get('/',authMiddleware.requireAuth,controller.index);

router.get('/cookie',(res,req,next)=>{
    res.cookie('user-id',12345);
    res.send('Hello');
})

router.get('/search', controller.search);

router.get('/create',controller.create);

router.get('/:id',controller.get);

router.post('/create',
upload.single('avatar'),
validate.postCreate,
 controller.postCreate);
//single ý là 1 file đơn lẻ, check field avatar gui client len
//req.file chứa file mình upload lên 
module.exports = router