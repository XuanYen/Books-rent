const express=require('express');
const app=express();
const bodyParser = require('body-parser');
const port=3000;

app.set('view engine', 'pug');
app.set('views','./views'); 

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var users=[
    {id: 1, name:'Thanh'},
    {id: 2, name:'Phong'},
];

app.get('/',(req, res)=>res.render('index',{
    name: 'AAA'
}));
//path ke tu folder view
//render tham so thu nhat la path, tham so thu 2 la object gom key:value
app.get('/users',(req,res)=>res.render('users/index',{
    users: users
}));
app.get('/users/search', (req,res)=>{
    var q=req.query.q;
    var matchedUsers=users.filter(user=>user.name.toLowerCase().indexOf(q.toLowerCase())!== -1);
    res.render('users/index',{
        users: matchedUsers
    })
});
app.get('/users/create',(req,res)=>res.render('users/create'));
//Tao endpoint trả lời được khi nhận request
//Chua validate, nhap gi cung gui duoc
app.post('/users/create',(req,res)=>{
    console.log(req.body)
    users.push(req.body);
    //Sau khi luu thong tin, chuyen ng dung ve lai trang user
    //method của res. 
    res.redirect('back');
});

app.listen(port,()=>console.log('server listening on port'+port));
