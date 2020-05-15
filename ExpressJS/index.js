require('dotenv').config();
const express=require('express');
const app=express();
var userRoute=require("./routes/user.route");
var authRoute=require('./routes/auth.route');
var productRoute=require('./routes/product.route');
var cartRoute=require('./routes/cart.route');

var authMiddleware=require("./middleware/auth.middleware");
var sessionMiddleware=require('./middleware/session.middleware');
const bodyParser= require('body-parser');
var cookieParser= require('cookie-parser');
const port=3000;

app.set('view engine', 'pug');
app.set('views','./views'); 

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);
//No se tac dong tat ca cac duong dan ta su dung
app.use(express.static('public'))
app.get('/',(req, res)=>res.render('index',{
    name: 'AAA'
}));


app.use('/users', authMiddleware.requireAuth,userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart',cartRoute);
app.listen(port,()=>console.log('server listening on port'+port));
