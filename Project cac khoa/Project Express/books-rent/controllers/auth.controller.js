const User = require("../models/user.model.js");
const sendEmail = require("../utils/sendEmail");
//var db=require('../db');
const bcrypt = require('bcrypt')
module.exports.login=(req,res)=>res.render('auth/login');
module.exports.postLogin=async (req,res)=>{
    var email=req.body.email;
    var password=req.body.password;
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password, salt);
    var user=await User.findOne({email})
    //var user=db.get("users").find({email: email}).value();
    if(!user){
        res.render('auth/login',{
            errors:[
                'User does not exit.'
            ],
            values: req.body
        });
        return;
    }
    var wrongLoginCount=user.wrongLoginCount;
    if(wrongLoginCount>4){
      sendEmail(user.email);
        res.render('auth/login',{
            errors: [
                'Locked account for wrong login over 4 times'
            ]
            });
        return;
    }
    var temp=bcrypt.compareSync(user.password, hash);
    if(!temp){
        wrongLoginCount=wrongLoginCount+1;
        await User.findByIdAndUpdate(user._id,{wrongLoginCount: wrongLoginCount})
        //db.get("users").find({email: email}).assign({wrongLoginCount: wrongLoginCount}).write();
            res.render('auth/login',{
                errors: [
                    'Wrong password'
                ],
                values: req.body
                });
        return;
    }
    res.cookie('userId', user._id,{
        signed: true
    });
    if (!user.isAdmin){
        res.redirect('/transaction/menu')
    }
    res.redirect('/users');
};