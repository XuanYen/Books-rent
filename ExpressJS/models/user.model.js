var mongoose=require('mongoose');

var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    avatar: String,
    phone: String
});
//Schema dung khai bao nhung field co trong object
//lam sach du lieu, validate du lieu,..
var User= mongoose.model('User', userSchema,'users');

module.exports=User;