
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const connection=require('./db')
//const {terminator}=require('./terminator')
const NodeCache = require( "node-cache" );
const crypto = require('crypto');
const CryptoJS = require("crypto-js");
const cache = new NodeCache();
const key = "poweta";
const Promise=require('promise');
const { resolve } = require('path');
const { rejects } = require('assert');
//const ter=new terminator();
// const {Client} = require('pg');
// const connection =  new Client({
//   host: '172.31.34.62',
//   user: 'powerta_user',
//   // database: ''+db_name+'',
//   database: "powerta_db",
//   password: 'powert@123',
//   port: 4321,
// });
// connection.connect()
const terminateConnectionsQuery = `
  SELECT pg_terminate_backend(pg_stat_activity.pid)
  FROM pg_stat_activity
  WHERE pg_stat_activity.datname = 'demo' 
    AND pid <> pg_backend_pid();
`;

class Helper  {

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  }


  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  
  // generateToken(id) {
  //   const token = jwt.sign({
  //     userId: id
  //   },
  //     process.env.SECRET, { expiresIn: '7d' }
  //   );
  //   console.log(token)
  //   return token;
  // }
  add(uuid){
    try {
        var token=this.generateToken();
        cache.set( uuid, token )
        return token;
    } catch (error) {
        console.log('error');
        
    }

}

generateToken() {
    var length=16;
    return crypto.randomBytes(length).toString('hex');
  }
   convertCrypt(x){
    var j=CryptoJS.AES.encrypt(x, key).toString();
    return j;
  }
   encryteraray(m){
    var k=[]
    for(var i=0;i<m.length;i++){
      console.log(m[i].key,m[i].db)
    //   m[i].key=this.convertCrypt(m[i].key);
    // m[i].db=this.convertCrypt(m[i].db);
    var key=this.convertCrypt(m[i].key);
    var db=this.convertCrypt(m[i].db);
    var organisation=this.convertCrypt(m[i].organixation);
    var app=this.convertCrypt(m[i].app);
    var bussiness=this.convertCrypt(m[i].bussiness);
    var p=[key,db,organisation,app,bussiness]
    console.log(p)
    k.push(p)
    }
  // console.log(k)
    return k;
  }

  makingkey(data){
    var db=data[0]
    // var instance=data.join("");
    var instance=db;
    var key=db+""+Math.floor(Math.random() * 9000)+"";
    console.log(key,db,instance)
    var terms=[db,instance,key]
    return terms;
  }


 makingdb(createDatabaseQuery,terms,id,res){
  
    // var ping=0;
    // ter.terminate();
    // // return new Promise((resolve,rejects))
    // try {
      return new Promise((resolve,rejects)=>{
        setTimeout(() => {
            console.log(' makingdb')
         //  ter.terminate(createDatabaseQuery)
            //   ter.create(createDatabaseQuery)
            //   console.log("done creating")
            
            //   //this.addtometa(terms,id)
            // } catch (error) {
            //   console.error(err);
            // }
          //   connection.query(terminateConnectionsQuery)
          // .then(() => {
          //   console.log('All active connections terminated.');
          //   return connection.query(createDatabaseQuery);
          // })
          // .then(() => {
          //   console.log('Database created successfully.');
          //  connection.end(); // Disconnect from the database
          // })
          // .catch((err) => {
          //   console.error(err);
          //  connection.end(); // Disconnect from the database
          // });
      
         
          resolve( );
        }, 3000);

      })
    //  console.log(' makingdb')

    //   ter.create(createDatabaseQuery)
    //   console.log("done creating")
    
    //   //this.addtometa(terms,id)
    // } catch (error) {
    //   console.error(err);
    // }
  //   connection.query(terminateConnectionsQuery)
  // .then(() => {
  //   console.log('All active connections terminated.');
  //   return connection.query(createDatabaseQuery);
  // })
  // .then(() => {
  //   console.log('Database created successfully.');
  //  // connection.end(); // Disconnect from the database
  // })
  // .catch((err) => {
  //   console.error(err);
  //  // connection.end(); // Disconnect from the database
  // });
 
  //   this.addtometa(terms,id,res);

    //this.addtometa(terms,id,res)
   // this.pinger(ping,terms,id,res)

  }

 addtometa(terms,id){
  return new Promise(async (resolve,rejects)=>{
     setTimeout(() => {
  console.log("cncnfd")
  console.log(id)
  const createQuery = `INSERT INTO keymeta (instance,db,key,user_f_key) 
  VALUES($1, $2, $3, $4)
  returning *`;
const values = [
  terms[1],
  terms[0],
  terms[2],
  id
];

  try {

    console.log("hhh........",createQuery,values)
   // connection.connect();
    setTimeout(async () => {
   
       await connection.query(createQuery, values)
        .then(() => {
          console.log('successfully. inserted value');
         connection.end(); // Disconnect from the database
         //console.log(r,"values")
            
           resolve();
        // var p=r.rows[0]
        // resolve(p)
        })
        .catch((err) => {
          console.error(err);
         connection.end(); // Disconnect from the database
        });
        
  
      }, 2000);
    
     
  
  
    // const r =connection.query(createQuery, values);
  
    // console.log(r.rows[0])
   

   
    
  } catch (error) {
    console.log("thereis error",error)
    
  }
 
 }, 4000);
})
}


}


module.exports={Helper,cache};

