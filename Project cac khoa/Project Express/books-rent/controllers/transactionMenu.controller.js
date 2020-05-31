//const db = require('../db')
const Transaction = require("../models/transaction.model.js");
const Book = require("../models/book.model.js");
module.exports.menu = async (req, res) =>{ 
    if(!req.signedCookies.userId){
        res.redirect('/auth/login');
        return;
    }
    //var transaction = db.get('transactions').filter({userId : req.signedCookies.userId}).value();
    var transaction=await Transaction.find({userId: req.signedCookies.userId})
    var books=await Book.find()
    res.render("transactions/menu",{
        transaction: transaction,
        books: books
    })
}