var express = require('express');
var multer  = require('multer');
var router = express.Router();
var controller=require('../controllers/book.controller');

router.get('/',controller.index);

var upload = multer({ dest: './uploads/' });
router.get('/create',controller.create);
router.post('/create',upload.single('cover'),controller.postCreate);

router.get('/:id',controller.getBook);
router.get('/:id/delete',controller.delete);

router.post('/:id/update',controller.update);
module.exports = router