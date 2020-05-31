//var db=require('../db');
var Product=require('../models/product.model');
module.exports.index=(async (req,res,next)=>{
    /*var page=parseInt(req.query.page) || 1 //n
    var perPage=8; //x
    var start=(page-1)*perPage;
    var end=page*perPage;
    var drop=(page-1)*perPage;

    res.render('products/index',{
        //Cach 1
        //products: db.get('products').value().slice(start,end)
        //Cach 2
        products: db.get('products').drop(drop).take(perPage).value()
    })
    */
   //Product.find() tra ve promise
    try{
        var products=await Product.find();
        res.render('products/index',{
            products: products
        });
    } catch (error){
        next(error);
    }
});