//const db = require('../db')
const User = require("../models/user.model.js");
module.exports.requireAdmin =  (isAdmin) =>{
    return async (req, res, next)=>{
        var user=await User.findById(req.signedCookies.userId)
        //let user = db.get("users").find({id: req.signedCookies.userId}).value();
        if (user.isAdmin === isAdmin){
            next();
        } else res.send(403);
    }
}
