const Book = require("../models/book.model.js");
//var db=require('../db');
var shortid=require('shortid');
var cloudinary = require('cloudinary').v2;
require('dotenv').config()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET
});
module.exports.index=async (req,res,next)=>{
    try{
        //var a; a.b(); Test handling error
        res.render('books/index',{
            books: await Book.find()
            //books: db.get('books').value()
        });
    }catch (error){
        res.render('error',{error: error})
        next();
    }
};
module.exports.create=(req,res)=>res.render('books/create');
module.exports.postCreate=async (req,res)=>{
    let file = await cloudinary.uploader.upload(req.file.path);
    const fs = require('fs')
    fs.unlinkSync(req.file.path);
    //req.body.id=shortid.generate();
    req.body.coverUrl=file.url;
    await Book.create(req.body);
    //db.get('books').push(req.body).write()
    res.redirect('/books');
};
module.exports.getBook=async (req,res)=>{
    /*var id= req.params.id;
    var book=db.get('books').find({id: id}).value();*/
    var book= await Book.findById({_id: req.params.id})
    res.render('books/view',{book: book})
};
module.exports.delete=async (req,res)=>{
    /*var id= req.params.id;
    db.get('books').remove({ id: id }).write()*/
    await Book.findOneAndRemove({_id: req.params.id})
    res.redirect('/books');
};
module.exports.update=async (req,res)=>{
    /*let idBook=req.params.id;
    db.get('books').find({id: idBook}).assign({title: req.body.title}).write()*/
    await Book.findByIdAndUpdate(req.params.id,{title: req.body.title})
    res.redirect('/books');
};