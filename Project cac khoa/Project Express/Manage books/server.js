// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port=3000;
require('dotenv').config()
var bookRoute=require("./routes/book.route");
var userRoute=require("./routes/user.route");
var transactionRoute=require("./routes/transaction.route")
var authRoute=require('./routes/auth.route');
var menuRoute=require('./routes/transactionMenu.route');
var authMiddleware=require("./middleware/auth.middleware");
var adminMiddleware=require('./middleware/admin.middleware');
var cookieParser = require('cookie-parser')

app.use(cookieParser(process.env.SESSION_SECRET))
app.set('view engine', 'pug');
app.set('views','./views'); 
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))

app.get('/',(req, res)=>res.render('index',{
    name: 'Hello books'
}));

app.use('/auth', authRoute);
app.use('/books',authMiddleware.requireAuth,adminMiddleware.requireAdmin(true), bookRoute);
app.use('/users',authMiddleware.requireAuth,adminMiddleware.requireAdmin(true), userRoute);
app.use('/transactions',authMiddleware.requireAuth,adminMiddleware.requireAdmin(true),transactionRoute);
app.use('/transaction', authMiddleware.requireAuth, adminMiddleware.requireAdmin(false), menuRoute)
// listen for requests :)
const listener = app.listen(3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

