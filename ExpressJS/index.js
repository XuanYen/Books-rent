require('dotenv').config();
const express=require('express');
const app=express();
var userRoute=require("./routes/user.route");
var authRoute=require('./routes/auth.route');
var authMiddleware=require("./middleware/auth.middleware");
const bodyParser= require('body-parser');
var cookieParser= require('cookie-parser');
const port=3000;

app.set('view engine', 'pug');
app.set('views','./views'); 

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static('public'))
app.get('/',(req, res)=>res.render('index',{
    name: 'AAA'
}));

app.use('/users', authMiddleware.requireAuth,userRoute);
app.use('/auth', authRoute);

app.listen(port,()=>console.log('server listening on port'+port));
