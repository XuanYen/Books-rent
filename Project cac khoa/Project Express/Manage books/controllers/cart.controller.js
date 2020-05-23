/*var db=require('../db');
var shortid=require('shortid');*/
const Book = require('../models/book.model');
const Session = require('../models/session.model');
const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');

module.exports.index=async (req,res)=>{
    //var cart=db.get("sessions").find({id: req.signedCookies.sessionId}).get('cart').value();
    var session= await Session.findById(req.signedCookies.sessionId);
    var cart=session.cart;
    var books=await Book.find();
    var store=cart.map(ele=>{
        var book=books.find(b=>b._id==ele.bookId.toString());
        quantitude=ele.quantitude;
        return {bookTitle: book.title, quantitude: quantitude}
    })
    res.render("cart/index",{
        store
    })
};

module.exports.addToCart=async (req,res,next)=>{
    var bookId=req.params.bookId;
    var sessionId=req.signedCookies.sessionId;
    if(!sessionId){
        res.redirect('/books');
    }
    //var count=db.get('sessions').find({id: sessionId}).get('cart.'+bookId,0).value();
    //db.get('sessions').find({id: sessionId}).set('cart.'+bookId,count+1).write();
    var session = await Session.findById(sessionId);
    var book = session.cart.find(
        cartItem => cartItem.bookId.toString() === bookId
      );
    
      if (book) {
        book.quantitude += 1;
        session.save();
      } else {
        await Session.findByIdAndUpdate(sessionId, {
          $push: { cart: { bookId, quantitude: 1 } }
        });
      }    
    res.redirect('/books');
};
module.exports.rent=async (req,res)=>{
    if(!req.signedCookies.userId){
        res.redirect('/auth/login');
        return;
    }
    /*var cart=db.get("sessions").find({id: req.signedCookies.sessionId}).get('cart').value();
    var cart=await Session.findById(req.signedCookies.sessionId).cart; 
    var books=Object.keys(cart).map(ele=>{
        var book=db.get('books').find({id: ele}).value();
        return book;
    })
    var quantitudes=Object.values(cart);
    var i=-1;
    store=storebooks.map(ele=>{
        i++;
        return {bookId: ele.id, bookTitle: ele.title, quantitude: quantitudes[i]}
    })*/
    var session= await Session.findById(req.signedCookies.sessionId);
    var cart=session.cart;
    var books=await Book.find();
    var store=cart.map(ele=>{
        var book=books.find(b=>b._id==ele.bookId.toString());
        quantitude=ele.quantitude;
        return {bookId: book._id, bookTitle: book.title, quantitude: quantitude}
    })
    console.log(store);
    //var transactions=db.get('transactions');
 
    /*store.map(ele=>{
        //var id=shortid.generate();
        var trans={userId: req.signedCookies.userId, bookId: ele.bookId, id: id, isCompvared: false, quantitude: ele.quantitude};
        transactions.create(trans);
    })
    db.get("sessions").remove({id: req.signedCookies.sessionId}).write()*/
    for(var i=0;i<store.length;i++){
        var trans={userId: req.signedCookies.userId, bookId: store[i].bookId,isCompleted: false, quantitude: store[i].quantitude}
        await Transaction.create(trans);
    }
    await Session.findByIdAndRemove(req.signedCookies.sessionId);
    res.redirect('/transactions'); 
}
