const User = require("../../models/user.model");
const bcrypt = require('bcrypt');
module.exports.index = async (req, res) => {
    res.json(await User.find());
};
module.exports.postCreate=async (req,res)=>{
    req.body.isAdmin = false;
    req.body.wrongLoginCount=0; 
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(req.body.password, salt)
    req.body.password=hash;
    if(req.body.name.split("").length>=30){
        res.json(["Username must less 30 characters"]);
        return
    }
    var user=await User.create(req.body)
    res.json(user);
};

module.exports.getUser=async (req,res)=>{
    var user=  await User.findById({_id: req.params.id})
    res.json(user);
};
module.exports.delete=async(req,res)=>{
    let user=await User.findByIdAndRemove(req.params.id)
    res.json(user);
};
module.exports.update=async (req,res)=>{
    var user=await User.findById({_id: req.params.id})
    res.json(user);
};
module.exports.postUpdate=async (req,res)=>{
    var user=await User.findByIdAndUpdate(req.params.id,{name: req.body.name, phone: req.body.phone})
    res.json(user);
};



   
