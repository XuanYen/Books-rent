const db = require('../db')

module.exports.requireAdmin = (isAdmin) =>{
    return (req, res, next)=>{
        let user = db.get("users").find({id: req.signedCookies.userId}).value();
        if (user.isAdmin === isAdmin){
            next();
        } else res.send(403);
    }
}
