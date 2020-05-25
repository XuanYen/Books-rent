//var db=require('../db');
var Product=require('../../models/product.model');
module.exports.index=(async (req,res)=>{
    var products=await Product.find();
    res.json(products);
    //method này nhận vào object/array và biến đổi thành json string trả về client
});

module.exports.create= async (req,res)=>{
    var product=await Product.create(req.body);
    res.json(product);
}