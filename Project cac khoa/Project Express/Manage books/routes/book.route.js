var express = require('express');
var shortid=require('shortid');
var router = express.Router()
var db=require('../db');

router.get('/',(req,res)=>res.render('books/index',{
    books: db.get('books').value()
}));


router.get('/create',(req,res)=>res.render('books/create'))
router.post('/create',(req,res)=>{
  req.body.id=shortid.generate();
  db.get('books').push(req.body).write()
  res.redirect('');
})

router.get('/:id',(req,res)=>{
  var id= req.params.id;
  var book=db.get('books').find({id: id}).value();
  res.render('books/view',{book: book})
})
router.get('/:id/delete',(req,res)=>{
  var id= req.params.id;
  db.get('books').remove({ id: id }).write()
  res.redirect('/books');
});

router.post('/:id/update',(req,res)=>{
  let idBook=req.params.id;
  db.get('books').find({id: idBook}).assign({title: req.body.title}).write()
  res.redirect('/books');
})
module.exports = router