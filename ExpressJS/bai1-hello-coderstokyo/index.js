const express=require('express');
//Tạo instance app, express là một function trả về app mới cho mình
const app=express();
const port=3000;
//Một web server phải có port để phân biệt các app khác nhau. Các app chạy trên cùng server có port khác nhau để truy cập vào
app.get('/',(request, response)=>response.send('Hello Coders.Tokyo'));
//Truoc hoac sau listen gi cũng được
//GET POST PUT DELETE PATCH
//get lay du lieu va hien thi len trinh duyet. Khi co get request gửi lên tới endpoint thì sẽ gọi function callback nhận vào 2 tham số request, reponse
//request là người dùng gửi lên, response là server trả về
//Thay đổi code phải restart lại server
app.listen(port,()=>console.log('server listening on port'+port));
//Có 2 tham số là port và callback(được gọi khi server đã start rồi)