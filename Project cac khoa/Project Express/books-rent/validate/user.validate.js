module.exports.postCreate=(req,res,next)=>{
    var errors=[];
    if(!req.body.name){
        errors.push("Name is required.")
    }
    if(req.body.name.split("").length>=30){
      errors.push("Username must less 30 characters")
    }
    if(!req.body.phone){
        errors.push("Phone is required.")
    } 
    if(!req.body.email){
        errors.push("Email is required.")
    } 
    if(!req.body.password){
        errors.push("Password is required.")
    } 
    if(errors.length){
        res.render('users/create',{
            errors: errors,
            values: req.body
        })
        return;
    }
  next();
};