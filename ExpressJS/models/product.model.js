var mongoose=require('mongoose');

var productSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
//Schema dung khai bao nhung field co trong object
//lam sach du lieu, validate du lieu,..
var Product= mongoose.model('Product', productSchema,'products');

module.exports=Product;