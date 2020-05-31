// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

var apiLoginRoute = require("./api/routes/login.route.js");
var apiTransactionRoute = require("./api/routes/transaction.route.js");
var apiBook=require("./api/routes/book.route");
var apiUser=require("./api/routes/user.route");

var bookRoute=require("./routes/book.route");
var userRoute=require("./routes/user.route");
var transactionRoute=require("./routes/transaction.route")
var authRoute=require('./routes/auth.route');
var menuRoute=require('./routes/transactionMenu.route');
var cartRoute=require('./routes/cart.route');

var authMiddleware=require("./middleware/auth.middleware");
var adminMiddleware=require('./middleware/admin.middleware');
var sessionMiddleware=require('./middleware/session.middleware');

var cookieParser = require('cookie-parser')

app.use(cookieParser(process.env.SESSION_SECRET));

app.set('view engine', 'pug');
app.set('views','./views'); 

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))
app.use(sessionMiddleware);
app.get('/',(req, res)=>res.render('index',{
    name: 'Hello books'
}));

app.use('/auth', authRoute);
app.use('/books', bookRoute);
app.use('/users',authMiddleware.requireAuth,adminMiddleware.requireAdmin(true), userRoute);
app.use('/transactions',authMiddleware.requireAuth,adminMiddleware.requireAdmin(true),transactionRoute);
app.use('/transaction', authMiddleware.requireAuth, adminMiddleware.requireAdmin(false), menuRoute)
app.use('/cart',cartRoute);

app.use("/api", apiLoginRoute);
app.use("/api", apiTransactionRoute);
app.use("/api", apiBook);
app.use("/api", apiUser);
// listen for requests :)
app.listen(3000,()=>console.log('server listening on port'+3000));

