
const express = require('express');



//const UserWithDb=new User();
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
app.get('/employee', function(req, res){
    return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
});
app.post('/upload', function(req, res){
    return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
 // UserWithDb.login(req, res);
});
app.post('/employee', function(req, res){
    return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
});

var pt=2094
app.listen(pt,"0.0.0.0")
console.log('app running on port ',pt);