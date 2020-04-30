var db=require('../db');
var shortid=require('shortid');

module.exports.index=(req,res)=>{
    var books=db.get('books').value();
    var users=db.get('users').value();
    var transactions=db.get('transactions').value();
    var changetrans=transactions.map(trans=>{
      var book=books.find(ele=>ele.id==trans.bookId);
      var user=users.find(ele=>ele.id==trans.userId);
      return {id: trans.id,bookTitle: book.title, userName: user.name, isCompleted: trans.isCompleted}
    });
    res.render("transactions/index",{
      transactions: changetrans,
      books,
      users
    })
};
module.exports.create=(req,res)=>{
    var users=db.get('users').value();
    var books=db.get('books').value();
    res.render('transactions/create',{users: users, books: books})
};
module.exports.postCreate=(req,res)=>{
    req.body.id=shortid.generate();
    req.body.isCompleted=false;
    db.get('transactions').push(req.body).write()
    res.redirect('/transactions');
};
module.exports.complete=(req,res)=>{
    var errors=[]; 
    var id=req.params.id;
    var transaction=db.get('transactions').find({id: id}).value()
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
module.exports.postComplete=(req,res)=>{
    let id=req.params.id;
    db.get('transactions').find({id: id}).assign({isCompleted: req.body.isCompleted}).write()
    res.redirect('/transactions')
};
module.exports.menu=(res,req)=>res.render("transactions/menu")