
const express = require('express');

const {User} = require('./src/user')

const UserWithDb=new User();
let cors = require("cors");



const app = express()
app.use(express.json())
app.use(cors());
app.get('/', (req, res) => {
  return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
});



app.post('/api/v1/users', function(req, res){
  UserWithDb.create(req, res);
});
app.get('/api/v1/users', function(req, res){
  console.log("hiiii")
});
app.post('/api/v1/users/login', function(req, res){
  UserWithDb.login(req, res);
});


app.post('/api/v1/users/test', function(req, res){
  UserWithDb.chenk(req, res);
});
app.post('/api/v1/users/keylogin', function(req, res){
  UserWithDb.keylogin(req, res);
});
app.post('/api/v1/users/tokenlogin', function(req, res){
  UserWithDb.tokenlogin(req, res);
});
app.post('/api/v1/users/tokenloginkey', function(req, res){
  UserWithDb.tokenloginkey(req, res);
});
app.post('/api/v1/users/createspace', function(req, res){
  UserWithDb.createspace(req, res);
});
app.delete('/api/v1/users/me', function(req, res){
  UserWithDb.delete(req, res);
});
var pt=2093
app.listen(pt,"0.0.0.0")
console.log('app running on port ',pt);