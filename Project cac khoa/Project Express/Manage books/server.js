// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port=3000;

var bookRoute=require("./routes/book.route")
var userRoute=require("./routes/user.route")

app.set('view engine', 'pug');
app.set('views','./views'); 
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/',(req, res)=>res.render('index',{
    name: 'Hello books'
}));

app.use('/books', bookRoute);
app.use('/users', userRoute);


// listen for requests :)
const listener = app.listen(port, () => {
  console.log("Your app is listening on port " + port);
});
