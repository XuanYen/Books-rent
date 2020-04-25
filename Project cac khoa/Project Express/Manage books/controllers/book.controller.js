var db=require('../db');
var shortid=require('shortid');

module.exports.index=(req,res)=>res.render('books/index',{
    books: db.get('books').value()
});
module.exports.create=(req,res)=>res.render('books/create');
module.exports.postCreate=(req,res)=>{
    req.body.id=shortid.generate();
    db.get('books').push(req.body).write()
    res.redirect('/books');
};
module.exports.getBook=(req,res)=>{
    var id= req.params.id;
    var book=db.get('books').find({id: id}).value();
    res.render('books/view',{book: book})
};
module.exports.delete=(req,res)=>{
    var id= req.params.id;
    db.get('books').remove({ id: id }).write()
    res.redirect('/books');
};
module.exports.update=(req,res)=>{
    let idBook=req.params.id;
    db.get('books').find({id: idBook}).assign({title: req.body.title}).write()
    res.redirect('/books');
};