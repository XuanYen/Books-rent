const express=require('express');
const app=express();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');


const adapter = new FileSync('db.json')
const db = low(adapter)
//Tao object bang cach goi low tra ve adapter
//Dung db tao truy xuat du lieu
db.defaults({ users: []})
  .write()
//Set cac gia tri default  
const bodyParser = require('body-parser');
const port=3000;

app.set('view engine', 'pug');
app.set('views','./views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//Tao id cho body roi luu vao array nay.
/*var users=[
    {id: 1, name:'Thanh'},
    {id: 2, name:'Phong'},
];=> Bo vi muon doc tu database ra*/

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

app.post('/users/create',(req,res)=>{
    db.get('users').push(req.body).write(); 
    res.redirect('/users');
});

app.listen(port,()=>console.log('server listening on port'+port));
