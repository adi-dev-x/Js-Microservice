
const db="new_beta"


const connection = require('./db');
// require("../instancesave")
var {instancemaker}=require('../instancesave')
const maker=new instancemaker();
const {Helper}=require('./helper')
const helper=new Helper();
const Promise=require('promise');
const { resolve } = require('path');
const { rejects } = require('assert');
var metadata=[]
var ip='3.108.166.150';
class instacehelper {
  async getkeys(res,id,token,checker){
    console.log("inside")
    const text1 = 'SELECT * FROM keymeta WHERE user_f_key = $1 ';
    try {
      const{rows}=await connection.query(text1, [id]);
      if (!rows[0]) {
        var k="The credentials you provided is incorrect"
        //k=helper.convertCrypt(k)
          //return res.status(400).send(k);
          console.log("reached in chenk")
          const error = new Error(k);
     error.statusCode = 404;
   
     // Sending the error response
     res.status(error.statusCode).json({ error: error.message });
   
   
        }
      
        else{
          try {
            
        
          if(checker==0){
            console.log(rows)
          var row=helper.encryteraray(rows)
        //  var tok=helper.convertCrypt(token);
          var sender=[token,row]
          return res.send(sender);
          }
          if(checker==1){
            var row=helper.encryteraray(rows)
            
            var sender=[row]
            return res.send(sender);
            }
            else{
              console.log('wrong case')
              var k="wrong case"
              console.log("reached in chenk")
              const error = new Error(k);
         error.statusCode = 404;
       
         // Sending the error response
         res.status(error.statusCode).json({ error: error.message });
            }

        } catch (error) {
            
        }


        
        }
  } catch (error) {
     
      var k="The credentials you provided is incorrect"
      k=helper.convertCrypt(k)
       // return res.status(400).send(k);
  }

  }

    
    async keychecker(res,key,id){

        const text = 'SELECT * FROM keymeta WHERE key = $1 AND user_f_key=$2';
     
        try {
            const{rows}=await connection.query(text, [key,id]);
            console.log(rows)
            if (!(rows.length)) {
              var k="The credentials you provided is incorrect"
              console.log('key..The credentials you provided is incorrect',key)
              k=helper.convertCrypt(k)
                return res.status(400).send(k);
              }
              if(!(id==rows[0].user_f_key)){
                console.log(id,"uuid....",rows[0].user_f_key)
                var k="wrong token";
                console.log("reached in chenk")
                const error = new Error(k);
           error.statusCode = 404;
         
           // Sending the error response
           res.status(error.statusCode).json({ error: error.message });

              }
              else{
                var instance=rows[0].instance;
                var db=rows[0].db;
                var identity=''+rows[0].user_f_key+'.'+rows[0].app_id+'.'+rows[0].buisiness+'.'+rows[0].organization+''
            

                this.check_exist(instance,db,res,identity)
              }
        } catch (error) {
          console.log('key222The credentials you provided is incorrect')
            var k="The credentials you provided is incorrect"
           // k=helper.convertCrypt(k)
              //return res.status(404).send(k);
        }
    }
    async check_exist(instance,db,res,iden){
        var count=0;
        if (metadata.length==0){
           this.add_Data(instance,db,res);
        }else{
       for(var i=0;i<metadata.length;i++){
          console.log("llllll",metadata)
        if(metadata[i][0]==instance && metadata[i][1]==db){
            i=metadata.length+1;
            var PQ=helper.convertCrypt('PQ'+instance)
      var QP=helper.convertCrypt('QP'+instance)
     var i=helper.convertCrypt(ip)
     var idn=helper.convertCrypt(iden)
      var sender=[PQ,QP,i,idn]
      return res.status(201).send(sender);
            
        }else if(1-(metadata[i][0]==instance || metadata[i][1]==db)){
          count+=1;
        }
         
      
       }if (count!=0){
        this.add_Data(instance,db,res,iden);
       }else{
        var PQ=helper.convertCrypt('PQ'+instance)
      var QP=helper.convertCrypt('QP'+instance)
      var i=helper.convertCrypt(ip)
      var idn=helper.convertCrypt(iden)
      var sender=[PQ,QP,i,idn]
      return res.status(201).send(sender);
       }
      }
    }
    async add_Data(instance,db,res,iden){
   
        var d=[instance,db]
        metadata.push(d);
        var k=[db,'PQ'+instance,'QP'+instance,ip,iden]
        console.log("before starting",k)
      
      maker.instancecreate(k,res);
     
      var PQ=helper.convertCrypt('PQ'+instance)
      var QP=helper.convertCrypt('QP'+instance)
     
      var i=helper.convertCrypt(ip)
      var idn=helper.convertCrypt(iden)
      var sender=[PQ,QP,i,idn]
      return res.status(201).send(sender);
    }



    async workspace(re,data,sid){
      var res=re
      var terms =helper.makingkey(data);
      console.log(terms[2])
     var id=sid;
      const newDatabaseName = data[0];
      const templateDatabaseName = 'demo';
     const createDatabaseQuery = `CREATE DATABASE ${newDatabaseName} TEMPLATE ${templateDatabaseName};`;
    //  console.log(createDatabaseQuery)
      
 helper.makingdb(createDatabaseQuery,terms,id,res).then(()=>{
   
    return helper.addtometa(terms,id)
 }).then(()=>{
  //console.log(p)
    //  var pke=p.key;
    // var pid=p.id;
    // return this.keychecke(res,pke,pid);
    return this.keychecke(res,terms[2],id);

 })
     



    }
    
    keychecke(res,key,id){
     
      return new Promise((resolve,rejects)=>{
        setTimeout(() => {
      
          console.log("keycheck",key,id);
   
      const text = 'SELECT * FROM keymeta WHERE key = $1 ';
   
      try {
//         const formattedQuery = format(text, key);
setTimeout(() => {
// // Print the query
//      console.log('Insert query:', formattedQuery);
          const{rows}=  connection.query(text, [key]);
          console.log("keycheck values",rows,"   and key",key)
          if (!rows[0]) {
            var k="The credentials you provided is incorrect"
            console.log('key..The credentials you provided is incorrect',key)
            console.log("reached in chenk")
            const error = new Error(k);
       error.statusCode = 404;
     
       // Sending the error response
       res.status(error.statusCode).json({ error: error.message });
            }
            if(!(id==rows[0].user_f_key)){
              var k="wrong token";
              console.log('key..no token')
              console.log("reached in chenk")
              const error = new Error(k);
         error.statusCode = 404;
       
         // Sending the error response
         res.status(error.statusCode).json({ error: error.message });

            }
            else{
              var instance=rows[0].instance;
              var db=rows[0].db;
              this.check_exist(instance,db,res)
            }
          }, 2000);
      } catch (error) {
        console.log('key333The credentials you provided is incorrect',error)
          var k="The credentials you provided is incorrect"
          //k=helper.convertCrypt(k)
           // return res.status(404).send(k);
      }
      

    }, 6000);



       






      })
     

  }

}

module.exports={instacehelper};