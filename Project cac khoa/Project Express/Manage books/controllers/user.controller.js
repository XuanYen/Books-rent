var db=require('../db');
var shortid=require('shortid');

module.exports.index=(req,res)=>res.render('users/index',{
    users: db.get('users').value()
});
module.exports.create=(req,res)=>res.render('users/create');
module.exports.postCreate=(req,res)=>{
    req.body.id=shortid.generate();
    db.get('users').push(req.body).write()
    res.redirect('/users');
};
module.exports.getUser=(req,res)=>{
    var id=req.params.id;
    var user=db.get('users').find({id: id}).value();
    res.render('users/view',{user: user})
};
module.exports.delete=(req,res)=>{
    var id= req.params.id;
    db.get('users').remove({ id: id }).write()
    res.redirect('/users');
};
module.exports.update=(req,res)=>{
    var id=req.params.id;
    var user=db.get('users').find({id: id}).value()
    console.log(user);
    res.render('users/update',{user: user})
};
module.exports.postUpdate=(req,res)=>{
    let idUser=req.params.id;
    db.get('users').find({id: idUser}).assign({name: req.body.name, age: req.body.age}).write()
    res.redirect('/users');
};