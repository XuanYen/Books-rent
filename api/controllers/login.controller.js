const User = require("../../models/user.model.js");
const sendEmail = require("../../utils/sendEmail");
const bcrypt = require('bcrypt')

module.exports.postLogin=async (req,res)=>{
    var email=req.body.email;
    var password=req.body.password;
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password, salt);
    var user=await User.findOne({email})
    if(!user){
        res.json(["User does not exist."]);
        return;
    }
    var wrongLoginCount=user.wrongLoginCount;
    if(wrongLoginCount>4){
      sendEmail(user.email);
      res.json({
        errors: ["Locked account for wrong login over 4 times"],
        values: req.body
      });
      return;
    }
    var temp=bcrypt.compareSync(user.password, hash);
    if(!temp){
        wrongLoginCount=wrongLoginCount+1;
        await User.findByIdAndUpdate(user._id,{wrongLoginCount: wrongLoginCount})
        //db.get("users").find({email: email}).assign({wrongLoginCount: wrongLoginCount}).write();
        res.json({
            errors: ["Wrong password."],
            values: req.body,
        });
        return;
    }
    res.json({ login: true });
};