var express = require('express');
var router = express.Router();
var controller=require('../controllers/book.controller');

router.get('/',controller.index);


router.get('/create',controller.create);
router.post('/create',controller.postCreate);

router.get('/:id',controller.getBook);
router.get('/:id/delete',controller.delete);

router.post('/:id/update',controller.update);
module.exports = router