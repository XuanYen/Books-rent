const db = require('../db')

module.exports.menu = (req, res) =>{ 
    if(!req.signedCookies.userId){
        res.redirect('/auth/login');
        return;
    }
    var transaction = db.get('transactions').filter({userId : req.signedCookies.userId}).value();
    res.render("transactions/menu",{
        transaction: transaction,
        books: db.get("books").value()
    })
}