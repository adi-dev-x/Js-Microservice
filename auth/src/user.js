
const moment =require('moment')
const crypto = require('crypto');
const connection = require('./db');
//  const {chaching}=require("./caching")
const NodeCache = require( "node-cache" );
const { v4: uuidv4 } = require('uuid');
const {Helper}=require('./helper')
const {instacehelper}=require('./instancehelper')
const inc= new instacehelper();
const helper=new Helper();
const cache = new NodeCache();




class User  {
  add(uuid,keys){
    var foundKey=0;
    try {
      console.log(keys)
      
      if(keys.length==0){
        var token=this.generateToken();
        cache.set( uuid, token )
        console.log(token)
        return token;
      }else{
      for(var i=0;i<keys.length;i++){
        console.log("keys in for loop",keys,"and foundkey...",foundKey)
        console.log(cache.get(keys[i]))
        if(uuid==keys[i]){
          foundKey=cache.get(keys[i])
          console.log(foundKey)
          return foundKey;
        }
      }
       if(foundKey==0){
        var token=this.generateToken();
        cache.set( uuid, token )
        console.log(token)
        return token;
       } else{
        console.log(foundKey)
        return foundKey;
       }}
    } catch (error) {
        console.log('error',error);
        
    }

}

generateToken() {
    var length=16;
    return crypto.randomBytes(length).toString('hex');
  }
 
  async create(req, res) {
   console.log("reached",req)
   var body=req.body
   console.log(body.email);
  //  var body=JSON.stringify(req.body)
    if (!body.email || !body.password || !body.key || !body.priority) {
      var k="missing values"
              k=inc.convertCrypt(k)
                return res.status(400).send(k);
    }
    if (!helper.isValidEmail(body.email)) {
      var k="not valid mail"
      k=helper.convertCrypt(k)
        return res.status(400).send(k);
    }

   
    const text = 'SELECT * FROM users WHERE email = $1';

    const { rows } = await connection.query(text, [body.email]);
    console.log(rows)
    if (rows.length!=0) {
      var k="email exist"
      k=inc.convertCrypt(k)
        return res.status(400).send(k);
    }
    const hashPassword = helper.hashPassword(body.password);
    console.log("")
    const createQuery = `INSERT INTO
     users(id, email, password,created_date, modified_date)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      uuidv4(),
      body.email,
      hashPassword,
      // body.key,
      // body.priority,
      
      moment(new Date()),
      moment(new Date())
    ];
  console.log(values);

    try {
      const { rows } = await connection.query(createQuery, values);
    //  const token = helper.generateToken(rows[0].id);
      // return res.status(201).send({ token });
      return res.status(201).send({'message': 'kitty mwone'});
    } catch(error) {
      if (error.routine === '_bt_check_unique') {
        var k="mail in use"
        k=inc.convertCrypt(k)
          return res.status(400).send(k);
      }
      return res.status(400).send(error);
    }
  }
async tokenloginkey(req, res) {
 console.log(req)
  var body=req.body;
  var khn=body.key;
  console.log("body",body,"...khn",khn)
  const keys = cache.keys();
  console.log(keys)
  const values = keys.map(key => cache.get(key));
  
  console.log(values)

  try {
if (!body.token || !body.key) {
      var k="missing values"
      console.log("missing values")
      console.log("reached in chenk")
      const error = new Error(k);
 error.statusCode = 404;

 // Sending the error response
 res.status(error.statusCode).json({ error: error.message });
    }
    if(!values.includes(body.token)){
     
 


      var k="wronk token"
      console.log("wrong")
      console.log("reached in chenk")
      const error = new Error(k);
 error.statusCode = 404;

 // Sending the error response
 res.status(error.statusCode).json({ error: error.message });
    }
    if(values.includes(body.token)){
      const searchValue = body.token;
      let foundKey = null;
      
      // Iterate through the cache data
      for(var i=0;i<keys.length;i++){
        console.log(cache.get(keys[i]))
        if(searchValue==cache.get(keys[i])){
          foundKey=keys[i]
          console.log(foundKey)
          break;
        }
      }
      var id=foundKey;
      // var id=keys.find(key => cache.get(key) === body.token) || null;
     
     console.log(id)
      inc.keychecker(res,khn,id);
    }
    else{
     console.log("...")
      

    }
  } catch (error) {
    
  }



}
async tokenlogin(req, res) {

  var body=req.body;
 
  const keys = cache.keys();
  console.log(keys)
  const values = keys.map(key => cache.get(key));
  
  console.log(values)
  try {
    if (!body.token  ) {
      var k="missing values"
      k=helper.convertCrypt(k)
        return res.status(400).send(k);
    }
    if(!values.includes(body.token)){
     
 


      var k="wronk token"
      console.log("wrong")
      k=helper.convertCrypt(k)
        return res.status(400).send(k);
    }
    if(values.includes(body.token)){
      const searchValue = body.token;
      let foundKey = null;
      
      // Iterate through the cache data
      for(var i=0;i<keys.length;i++){
        console.log(cache.get(keys[i]))
        if(searchValue==cache.get(keys[i])){
          foundKey=keys[i]
          console.log(foundKey)
          break;
        }
      }
      var id=foundKey;
      var checker=1;
      // var id=keys.find(key => cache.get(key) === body.token) || null;
     
     console.log(id)
     inc.getkeys(res,id,body.token,checker);
    }
    else{
      
      console.log("...")
      

    }
  } catch (error) {
    
  }



}
async createspace(req,res){
  var body=req.body;
  const keys = cache.keys();
  console.log(keys)
  const values = keys.map(key => cache.get(key));
  
  console.log(values)
  try {
    if (!body.token || !body.name || !body.service) {
      var k="missing values"
      k=helper.convertCrypt(k)
        return res.status(400).send(k);
    }
    if(!values.includes(body.token)){
      var k="wronk token"
      console.log("wrong")
      k=helper.convertCrypt(k)
        return res.status(400).send(k);
    }
    if(values.includes(body.token)){
      const searchValue = body.token;
      let foundKey = null;
      
      // Iterate through the cache data
      for(var i=0;i<keys.length;i++){
        console.log(cache.get(keys[i]))
        if(searchValue==cache.get(keys[i])){
          foundKey=keys[i]
          console.log(foundKey)
          break;
        }
      }
      var id=foundKey;
      // var id=keys.find(key => cache.get(key) === body.token) || null;
     
     console.log(id)
    
     var data =[body.name,body.service];
     
      inc.workspace(res,data,id);
    }
    else{
      console.log("...")
      

    }
  } catch (error) {
    
  }




}


async chenk(req,res){

  res.statusCode = 500;
  res.setHeader('Content-Type', 'application/json');
  
  // Sending the response
  res.end(JSON.stringify({ error: 'Internal Server Error' }));

}

  
  async login(req, res) {
    console.log("reached")
    var body=req.body
    const keys = cache.keys();
    //  var body=JSON.stringify(req.body) ()
   
    if (!body.email || !body.password ) {
      var k="missing values"
      console.log("reached in chenk")
      const error = new Error(k);
 error.statusCode = 404;

 // Sending the error response
 res.status(error.statusCode).json({ error: error.message });
    }
    if (!helper.isValidEmail(body.email)) {
      var k="not valid mail"
      console.log("reached in chenk")
      const error = new Error(k);
 error.statusCode = 404;

 // Sending the error response
 res.status(error.statusCode).json({ error: error.message });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await connection.query(text, [body.email]);
      console.log(rows)
      if (!(rows.length)) {
        var k="not exist"
        console.log("reached in chenk")
        const error = new Error(k);
   error.statusCode = 404;
 
   // Sending the error response
   res.status(error.statusCode).json({ error: error.message });
      }
      if(!(rows[0].email== body.email)) {
        var k="wrong email"
        console.log("reached in chenk")
        const error = new Error(k);
   error.statusCode = 404;
 
   // Sending the error response
   res.status(error.statusCode).json({ error: error.message });
      }
  

      if(!helper.comparePassword(rows[0].password, body.password)) {
        var k="wrong pass"
        console.log("reached in chenk")
        const error = new Error(k);
   error.statusCode = 404;
 
   // Sending the error response
   res.status(error.statusCode).json({ error: error.message });
      }
  
      
  
      else{
        console.log("scsdsds............",rows[0])
       console.log(rows[0].id) 
       var checker=0;
       var token=this.add(rows[0].id,keys);
       console.log(token)
       var id=rows[0].id
       inc.getkeys(res,id,token,checker);
      }
    } catch(error) {
      //return res.status(404).send(error)
    }
  }




  async delete(req, res) {
    const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
    try {
      const { rows } = await connection.query(deleteQuery, [req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'user not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  }

}

module.exports={User};

