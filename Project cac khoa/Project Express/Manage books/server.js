// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();



var shortid=require('shortid');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ books: []})
  .write()
//Set cac gia tri default  
const bodyParser = require('body-parser');
const port=3000;

app.set('view engine', 'pug');
app.set('views','./views'); 
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/',(req, res)=>res.render('index',{
    name: 'Hello books'
}));

app.get('/books',(req,res)=>res.render('books/index',{
    books: db.get('books').value()
}));


app.get('/books/create',(req,res)=>res.render('books/create'))
app.post('/books/create',(req,res)=>{
  req.body.id=shortid.generate();
  db.get('books').push(req.body).write()
  res.redirect('/books');
})

app.get('/books/:id',(req,res)=>{
  var id= req.params.id;
  var book=db.get('books').find({id: id}).value();
  res.render('books/view',{book: book})
})
app.get('/books/:id/delete',(req,res)=>{
  var id= req.params.id;
  db.get('books').remove({ id: id }).write()
  res.redirect('/books');
});

app.post('/books/:id/update',(req,res)=>{
  let idBook=req.params.id;
  db.get('books').find({id: idBook}).assign({title: req.body.title}).write()
  res.redirect('/books');
})

// listen for requests :)
const listener = app.listen(port, () => {
  console.log("Your app is listening on port " + port);
});
