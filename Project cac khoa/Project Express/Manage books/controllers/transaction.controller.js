/*var db=require('../db');
var shortid=require('shortid');
*/
const User = require("../models/user.model.js");
const Transaction = require("../models/transaction.model.js");
const Book = require("../models/book.model.js");
module.exports.index=async (req,res)=>{
    var page=parseInt(req.query.page) || 1 
    var perPage=8; 
    var start=(page-1)*perPage;
    var end=page*perPage;
    //var books=db.get('books').value();
    //var users=db.get('users').value();
    //var transactions=db.get('transactions').value();
    var books = await Book.find();
    var users = await User.find();
    var transactions = await Transaction.find();

    var pages=[];
    for(var i=1;i<=(transactions.length)/perPage+1;i++){
      pages.push(i);
    }
    var changetrans=transactions.map(trans=>{
      //var user=db.get('users').find({id: trans.userId}).value();
      //var book=db.get('books').find({id: trans.bookId}).value();
      //var user=await User.findById({_id:trans.userId});
      //var book=await Book.findById({_id: trans.bookId});
      let user=users.find(user=>user._id==trans.userId.toString());
      let book=books.find(book=>book._id==trans.bookId.toString());
      console.log(user,book)
      var result={id: trans.id, bookTitle: book.title,userName: user.name, isCompleted: trans.isCompleted}
      return result;
    }).slice(start,end);
    res.render("transactions/index",{
      transactions: changetrans,
      books,
      users,
      pages
    })
};
module.exports.create=async (req,res)=>{
    //var users=db.get('users').value();
    //var books=db.get('books').value();
    var books = await Book.find();
    var users = await User.find();
    res.render('transactions/create',{users: users, books: books})
};
module.exports.postCreate=async (req,res)=>{
    //req.body.id=shortid.generate();
    req.body.isCompleted=false;
    //db.get('transactions').push(req.body).write()
    await Transaction.create(req.body)
    res.redirect('/transactions');
};
module.exports.complete=async (req,res)=>{
    var errors=[]; 
    //var id=req.params.id;
    //var transaction=db.get('transactions').find({id: id}).value()
    var transaction=await Transaction.findById(req.params.id);
    if(!transaction){
       errors.push('Id failed. Transaction is not exist');
    }
    if(errors.length){
        res.render('transactions/complete',{
            errors: errors
        })
        return;
    }
    res.render('transactions/complete',{transaction: transaction})
};
module.exports.postComplete=async (req,res)=>{
    //let id=req.params.id;
    //db.get('transactions').find({id: id}).assign({isCompleted: req.body.isCompleted}).write()
    await Transaction.findByIdAndUpdate(req.params.id,{isCompleted: req.body.isCompleted});
    res.redirect('/transactions')
};
module.exports.menu=(res,req)=>res.render("transactions/menu")