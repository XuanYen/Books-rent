const express=require('express');
const app=express();
var shortid=require('shortid');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');


const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ users: []})
  .write()

const bodyParser = require('body-parser');
const port=3000;

app.set('view engine', 'pug');
app.set('views','./views'); 

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/',(req, res)=>res.render('index',{
    name: 'AAA'
}));

app.get('/users',(req,res)=>res.render('users/index',{
    users: db.get('users').value()
}));
app.get('/users/search', (req,res)=>{
    var q=req.query.q;
    var matchedUsers=users.filter(user=>user.name.toLowerCase().indexOf(q.toLowerCase())!== -1);
    res.render('users/index',{
        users: matchedUsers
    })
});

app.get('/users/create',(req,res)=>res.render('users/create'));

app.get('/users/:id',(req,res)=>{
    var id= req.params.id; 
    var user=db.get('users').find({ id: id }).value()
    res.render('users/view',{
        user: user
    }); 
});
//Thong thuong db se tao id cho minh, TH nay minh tu tao
app.post('/users/create',(req,res)=>{
    req.body.id=shortid.generate();
    db.get('users').push(req.body).write(); 
    res.redirect('/users');
});

app.listen(port,()=>console.log('server listening on port'+port));
