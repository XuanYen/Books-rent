var db=require('../db');
var shortid=require('shortid');
module.exports.create=(req,res,next)=>{
    var csrfToken=req.csrfToken();
    res.render('transfer/create', { 
        csrfToken: csrfToken
    });   
//Tao method cua req, tra ve string nao day
}
module.exports.postCreate=(req,res,next)=>{
    var data={
        id: shortid.generate(),
        amount: parseInt(req.body.amount),
        accountId: req.body.accountId,
        userId: req.signedCookies.userId
    }
    db.get('transfers').push(data).write();
    res.redirect('/transfer/create')
}