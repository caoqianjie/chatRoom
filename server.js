var express = require('express');
var path = require('path');
var User = require('./db').User;
var Room = require('./db').Room;
var bodyParser = require('body-parser');
var app = express();
app.get('/',function (req, res) {
   res.sendFile(path.resolve('app/index.html'));
});
app.use(express.static(path.resolve('public')));
app.use(express.static(path.resolve('app')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.post('/user/login',function (req, res) {
   var email = req.body.email;
   var user = {email};
   User.findOne(user,function (err,doc) {
      if(err){
         res.send({err:1,msg:"查询出错",data:err});
      }else{
         if(doc) {
            res.send({err:0,msg:"成功",data:doc})
         }else{
            user.avatar = 'https://secure.gravatar.com/avatar/email';
            User.create(user,function (err, doc2) {
               if(err) {
                  res.send({err:1,msg:"创建出错",data:err});
               }else{
                  res.send({err:0,msg:"成功",data:doc2})
               }
            })
         }
      }
   })
});
app.get('/rooms',function (req, res) {
   Room.find({},function (err, rooms) {
      if(err) {
         res.send({err:1,msg:"查询出错",data:err})
      }else{
         if(rooms) {
            res.send({err:0,msg:"成功",data:rooms})
         }else{
            res.send('hello');
         }
      }
   })
});
app.post('/rooms/add',function (req,res) {
   var room = req.body;
   room.users = room.messages = [];
   Room.create(room,function (err, doc) {
      if(err) {
         res.send({err: 1,msg: '创建失败',data: err})
      }else{
         if(doc) {
            res.send({err: 0,msg: '创建成功',data:doc})
         }else{
            res.send('hello');
         }
      }
   });
});
app.listen(9090);