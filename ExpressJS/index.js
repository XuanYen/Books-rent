const express=require('express');
const app=express();
const port=3000;

app.set('view engine', 'pug');
app.set('views','./views'); 

var users=[
    {id: 1, name:'Thanh'},
    {id: 2, name:'Phong'}
];
app.get('/',(req, res)=>res.render('index',{
    name: 'AAA'
}));

app.get('/users',(req,res)=>res.render('users/index',{
    users: users
}));
app.get('/users/search', (req,res)=>{
    var q=req.query.q;
    //Filter user theo tu khoa nay de xem ten co match voi q nay khong
    var matchedUsers=users.filter(user=>user.name.toLowerCase().indexOf(q.toLowerCase())!== -1);
    //Chuyen het ve chu thuong de loc duoc moi truong hop
    res.render('users/index',{
        users: matchedUsers
    })
})
app.listen(port,()=>console.log('server listening on port'+port));
