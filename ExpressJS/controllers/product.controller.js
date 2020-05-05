var db=require('../db');
module.exports.index=((req,res)=>{
    var page=parseInt(req.query.page) || 1 //n
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
});