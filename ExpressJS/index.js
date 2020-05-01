const express=require('express');
const app=express();
var userRoute=require("./routes/user.route")
const bodyParser = require('body-parser');
const port=3000;

app.set('view engine', 'pug');
app.set('views','./views'); 

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))
app.get('/',(req, res)=>res.render('index',{
    name: 'AAA'
}));

app.use('/users', userRoute);

app.listen(port,()=>console.log('server listening on port'+port));
