var express = require('express');
var shortid=require('shortid');
var router = express.Router()
var db=require('../db');

router.get('/',(req,res)=>res.render('users/index',{
  users: db.get('users').value()
}));

router.get('/create',(req,res)=>res.render('users/create'))
router.post('/create',(req,res)=>{
  req.body.id=shortid.generate();
  db.get('users').push(req.body).write()
  res.redirect('/users');
})
router.get('/:id',(req,res)=>{
  var id=req.params.id;
  var user=db.get('users').find({id: id}).value();
  res.render('users/view',{user: user})
})
router.get('/:id/delete',(req,res)=>{
  var id= req.params.id;
  db.get('users').remove({ id: id }).write()
  res.redirect('/users');
});
router.get('/:id/update',(req,res)=>{
  var id=req.params.id;
  var user=db.get('users').find({id: id}).value()
  console.log(user);
  res.render('users/update',{user: user})
})
router.post('/:id/update',(req,res)=>{
  let idUser=req.params.id;
  db.get('users').find({id: idUser}).assign({name: req.body.name, age: req.body.age}).write()
  res.redirect('/users');
})
module.exports = router