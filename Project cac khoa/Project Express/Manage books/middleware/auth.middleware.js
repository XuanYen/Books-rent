//var db=require('../db');
const User = require("../models/user.model.js");
module.exports.requireAuth=async (req,res,next)=>{
    if(!req.signedCookies.userId){
        res.redirect('/auth/login');
        return;
    }
    //var user=db.get("users").find({id: req.signedCookies.userId}).value();
    var user=await User.findById(req.signedCookies.userId)
    if(!user){
        res.redirect('/auth/login');
        return;
    }
    res.locals.user=user;
    next(); 
}
