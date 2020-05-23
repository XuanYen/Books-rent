const User = require("../models/user.model.js");
/*var db=require('../db');
var shortid=require('shortid');*/
var cloudinary = require('cloudinary').v2;
require('dotenv').config()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET
});
const bcrypt = require('bcrypt');
module.exports.index=async(req,res)=>{
    /*res.render('users/index',{
        users: db.get('users').value()
    })*/
    res.render('users/index',{
        users: await User.find()
    })
};
module.exports.create=(req,res)=>res.render('users/create');
module.exports.postCreate=async (req,res)=>{
    //req.body.id=shortid.generate();
    req.body.isAdmin = false;
    req.body.wrongLoginCount=0; 
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(req.body.password, salt)
    req.body.password=hash;
    var errors=[];
    if(req.body.name.split("").length>=30){
      errors.push("Username must less 30 characters")
    }
    if(errors.length){
        res.render('users/create',{
            errors: errors,
            values: req.body
        })
        return;
    }
    await User.create(req.body)
    //db.get('users').push(req.body).write()
    res.redirect('/users');
};

module.exports.getUser=async (req,res)=>{
    /*var id=req.params.id;
    var user=db.get('users').find({id: id}).value();*/
    var user=  await User.findById({_id: req.params.id})
    res.render('users/view',{user: user})
};
module.exports.delete=async(req,res)=>{
    /*var id= req.params.id;
    db.get('users').remove({ id: id }).write()*/
    await User.findByIdAndRemove(req.params.id)
    res.redirect('/users');
};
module.exports.update=async (req,res)=>{
    /*var id=req.params.id;
    var user=db.get('users').find({id: id}).value()*/
    var user=await User.findById({_id: req.params.id})
    res.render('users/update',{user: user})
};
module.exports.postUpdate=async (req,res)=>{
    /*let idUser=req.params.id;
    db.get('users').find({id: idUser}).assign({name: req.body.name, phone: req.body.phone}).write()*/
    await User.findByIdAndUpdate(req.params.id,{name: req.body.name, phone: req.body.phone})
    res.redirect('/users');
};
module.exports.profile=async (req,res)=>{
    /*let idUser=req.signedCookies.userId;
    var user=db.get('users').find({id: idUser}).value()*/
    var user=await User.findById({_id: req.signedCookies.userId});
    if(!user.avatarUrl){
        //db.get('users').find({id: idUser}).assign({avatarUrl: "https://ramcotubular.com/wp-content/uploads/default-avatar.jpg"}).write()
        await User.findByIdAndUpdate(req.signedCookies.userId,{avatarUrl: "https://ramcotubular.com/wp-content/uploads/default-avatar.jpg"})
    }
    res.render('users/profile',{user: user})
};
module.exports.postInfo=async (req,res)=>{
    //db.get('users').find({id: req.signedCookies.userId}).assign({name: req.body.name, phone: req.body.phone, email: req.body.email}).write()
    await User.findByIdAndUpdate(req.signedCookies.userId,{name: req.body.name, phone: req.body.phone, email: req.body.email})
    res.redirect('/users');
};   
module.exports.avatar=async (req,res)=>{
    /*let idUser=req.signedCookies.userId;
    var user=db.get('users').find({id: idUser}).value()*/
    var user=await User.findById(req.signedCookies.userId)
    res.render('users/avatar',{user: user})
};
module.exports.postAvatar=async (req,res)=>{
    let file = await cloudinary.uploader.upload(req.file.path);
    const fs = require('fs')
    fs.unlinkSync(req.file.path);
    //db.get("users").find({ id: req.signedCookies.userId }).assign({ avatarUrl: file.url }).write()
    await User.findByIdAndUpdate(req.signedCookies.userId,{avatarUrl: file.url})
    res.redirect('/users/profile');
};


   
