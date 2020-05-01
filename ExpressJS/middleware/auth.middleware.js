//Check xem cookie co duoc gui len khong
var db=require('../db');
module.exports.requireAuth=(req,res,next)=>{
    if(!req.cookies.userId){
        res.redirect('/auth/login');
        return;
    }
    var user=db.get("users").find({id: req.cookies.userId}).value();
    if(!user){
        res.redirect('/auth/login');
        return;
    }
    next(); //de chay sang middleware tiep theo
}