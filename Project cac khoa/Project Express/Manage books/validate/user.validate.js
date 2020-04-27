module.exports.postCreate=(req,res)=>{
    var errors=[];
    if(req.body.name.split("").length>=30){
      errors.push("Username must less 30 characters")
    }
    if(errors.length){
        res.render('users/create',{
            errors: errors,
            values: req.body
        })
        return;
    }
};