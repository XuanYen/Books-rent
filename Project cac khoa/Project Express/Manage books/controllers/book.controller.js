var db=require('../db');
var shortid=require('shortid');
var cloudinary = require('cloudinary').v2;
require('dotenv').config()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET
});
module.exports.index=(req,res)=>res.render('books/index',{
    books: db.get('books').value()
});
module.exports.create=(req,res)=>res.render('books/create');
module.exports.postCreate=async (req,res)=>{
    let file = await cloudinary.uploader.upload(req.file.path);
    const fs = require('fs')
    fs.unlinkSync(req.file.path);
    req.body.id=shortid.generate();
    req.body.coverUrl=file.url;
    console.log(req.body)
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