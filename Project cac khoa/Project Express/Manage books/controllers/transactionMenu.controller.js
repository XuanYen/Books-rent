const db = require('../db')

module.exports.menu = (req, res) =>{ 
    if(!req.cookies.userId){
        res.redirect('/auth/login');
        return;
    }
    var transaction = db.get('transactions').filter({userId : req.cookies.userId}).value();
    res.render("transactions/menu",{
        transaction: transaction,
        books: db.get("books").value()
    })
}