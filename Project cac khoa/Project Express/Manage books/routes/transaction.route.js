var express = require('express');
var shortid=require('shortid');
var router = express.Router()
var db=require('../db');

router.get('/',(req,res)=>{
  var books=db.get('books').value();
  var users=db.get('users').value();
  var transactions=db.get('transactions').value();
  var changetrans=transactions.map(trans=>{
    var book=books.find(ele=>ele.id==trans.bookId);
    var user=users.find(ele=>ele.id==trans.userId);
    return {bookTitle: book.title, userName: user.name}
  });
  res.render("transactions/index",{
    transactions: changetrans,
    books,
    users
  })
});

router.get('/create',(req,res)=>{
  var users=db.get('users').value();
  var books=db.get('books').value();
  res.render('transactions/create',{users: users, books: books})
});
router.post('/create',(req,res)=>{
  req.body.id=shortid.generate();
  db.get('transactions').push(req.body).write()
  res.redirect('/transactions');
});
/*
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
})*/
module.exports = router