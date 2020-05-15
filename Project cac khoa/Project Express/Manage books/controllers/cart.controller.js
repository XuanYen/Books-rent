var db=require('../db');
var shortid=require('shortid');
module.exports.index=(req,res)=>{
    var cart=db.get("sessions").find({id: req.signedCookies.sessionId}).get('cart').value();
    var books=Object.keys(cart).map(ele=>{
        var book=db.get('books').find({id: ele}).value();
        return book;
    })
    var quantitudes=Object.values(cart);
    var i=-1;
    store=books.map(ele=>{
        i++;
        return {bookTitle: ele.title, quantitude: quantitudes[i]}
    })
    res.render("cart/index",{
        store
      })
};

module.exports.addToCart=(req,res,next)=>{
    var bookId=req.params.bookId;
    var sessionId=req.signedCookies.sessionId;
    if(!sessionId){
        res.redirect('/books');
        return;
    }
    var count=db.get('sessions').find({id: sessionId}).get('cart.'+bookId,0).value();
    db.get('sessions').find({id: sessionId}).set('cart.'+bookId,count+1).write();
    res.redirect('/books');
};
module.exports.rent=(req,res)=>{
    if(!req.signedCookies.userId){
        res.redirect('/auth/login');
        return;
    }
    var cart=db.get("sessions").find({id: req.signedCookies.sessionId}).get('cart').value();
    var books=Object.keys(cart).map(ele=>{
        var book=db.get('books').find({id: ele}).value();
        return book;
    })
    var quantitudes=Object.values(cart);
    var i=-1;
    store=books.map(ele=>{
        i++;
        return {bookId: ele.id, bookTitle: ele.title, quantitude: quantitudes[i]}
    })
    var transactions=db.get('transactions');
    store.map(ele=>{
        var id=shortid.generate();
        var trans={userId: req.signedCookies.userId, bookId: ele.bookId, id: id, isCompleted: false, quantitude: ele.quantitude};
        transactions.push(trans).write();
    })
    db.get("sessions").remove({id: req.signedCookies.sessionId}).write()
    res.redirect('/transactions') 
}
