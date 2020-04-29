const express=require('express');
const app=express();
const bodyParser = require('body-parser');
const port=3000;
var shortid=require('shortid');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json')
const db = low(adapter)
//Tao object bang cach goi low tra ve adapter
//Dung db tao truy xuat du lieu
db.defaults({ users: []})
  .write()
//Set cac gia tri default  
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
})
app.get('/users/create',(req,res)=>res.render('users/create'));
//Tao endpoint trả lời được khi nhận request
//Chua validate, nhap gi cung gui duoc

app.get('/users/:id',(req,res)=>{
    //route param chứ không phải query
    //Khi get request gửi tới url đó thì sẽ chạy callback, cái gì đó sẽ được lưu ở cái biến nằm trong req.params.id
    var id= req.params.id; //string-> chuyen sang number
    //Lay user trong db ra
    var user=db.get('users').find({ id: id }).value()
    //Tim id trung voi id, tim ra 1 cai ele dau tien co value cua key la nhan duoc tu param
    res.render('users/view',{
        user: user
    }); //Phai define view.pug
});


app.post('/users/create',(req,res)=>{
    req.body.id=shortid.generate();
    db.get('users').push(req.body).write(); //de ghi lai trong file
    //Sau khi luu thong tin, chuyen ng dung ve lai trang user
    //method của res. 
    res.redirect('/users');
});
app.listen(port,()=>console.log('server listening on port'+port));
