var db=require('../db');
const bcrypt = require('bcrypt')
module.exports.login=(req,res)=>res.render('auth/login');
module.exports.postLogin=(req,res)=>{
    var email=req.body.email;
    var password=req.body.password;
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password, salt)
    var user=db.get("users").find({email: email}).value();
    var wrongLoginCount=user.wrongLoginCount;
    if(!user){
        res.render('auth/login',{
            errors:[
                'User does not exit.'
            ],
            values: req.body
        });
        return;
    }
    var temp=bcrypt.compareSync(user.password, hash);
    if(!temp){
        wrongLoginCount=wrongLoginCount+1;
        db.get("users").find({email: email}).assign({wrongLoginCount: wrongLoginCount}).write();
        if(wrongLoginCount<=4){
            res.render('auth/login',{
                errors: [
                    'Wrong password'
                ],
                values: req.body
                });
        }
    }
    if(wrongLoginCount>4){
        res.render('auth/login',{
            errors: [
                'Failed login. Your account is blocked'
            ]
            });
        return;
    }
    res.cookie('userId', user.id,{
        signed: true
    });
    if (!user.isAdmin){
        res.redirect('/transaction/menu')
    }
    res.redirect('/users');
};