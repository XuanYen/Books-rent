var shortid=require('shortid');
var db=require('../db');
module.exports=(req,res,next)=>{
    if(!req.signedCookies.sessionId){
        var sessionId=shortid.generate();
        res.cookie('sessionId',sessionId,{
            signed: true 
        });
        db.get('sessions').push({id: sessionId}).write();
        next();
    }
    else{
        if(req.signedCookies.userId){
            db.get('sessions').find({id: req.signedCookies.sessionId}).assign({id: req.signedCookies.userId}).write();
            req.signedCookies.sessionId=req.signedCookies.userId;
            next();
        }
        next();
    }
}