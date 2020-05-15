var shortid=require('shortid');
var db=require('../db');
module.exports=(req,res,next)=>{
    if(!req.signedCookies.sessionId){
        var sessionId=shortid.generate();
        res.cookie('sessionId',sessionId,{
            signed: true //de bao mat hon, nguoi dung khong chinh sua duoc
        });

    }
    db.get('sessions').push({id: sessionId}).write()
    next();
}