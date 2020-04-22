const express=require('express');
const app=express();

const port=3000;

app.set('view engine', 'pug');
app.set('views','./views'); //Thu muc chua cac view

app.get('/',(req, res)=>res.render('index',{
    name: 'AAA'
}));
//path ke tu folder view
//render tham so thu nhat la path, tham so thu 2 la object gom key:value
app.get('/users',(req,res)=>res.render('users/index',{
    users:[
        {id: 1, name:'Thanh'},
        {id: 2, name:'Phong'}
    ]
}));
app.listen(port,()=>console.log('server listening on port'+port));
