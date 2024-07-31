var async= require('async')
//const args = process.argv.slice(2); 
//var db=args[0]
var db='teststore';
//var PQ=args[1]
var PQ='PQ'
//var QP=args[2]
var QP='QP'
//var ip=args[3]
//var ip=args[3]
var ip='ec2-51-20-133-218.eu-north-1.compute.amazonaws.com'
var iden=''
var asql=["select party_name,amount,pay_typ,pay_dte from payment_out order by prty_id desc;","select site.site_name,expense_amount,pay_typ,exp_dat  from site_expense left join site on site.site_id=site_expense.site_f_key order by site_exp_id desc;","select name,acc_no ,acc_holder_name, bank ,ifc_code, upid,amount,payment_type,as_of_date from accountings order by id desc;"]
console.log("{==p==-=-=-=}",db)
module.exports={db,PQ,QP,ip,iden};

//const uploads=require('./src/image')
//const {workspaces}=require('./src/workspace')
const { PowerQuery } = require("./src/powerQuery");
const { MqttAdapter } = require("./src/mqttAdapter");
const {metabuilder,meta}=require('./src/eventDistributer')
const mbuild= new meta();
const {streamOnDataChange,listing,saveEvent} = require("./src/eventDistributer");

const {Client} = require('pg');
var QH =require("./src/queryHash");
//var up=new uploads;
//var wk= new workspaces;

const connection =  new Client({
        host: '13.201.76.112',
        user: 'postgres',
       database: ''+db+'',
      // database: "employ",
       password: 'aalbot',
       port: 5432,
});



connection.connect();
listing();

console.log("Binding powerquery");
pq = new PowerQuery(new MqttAdapter());

pq.createStream("UPDATE",async(event,data)=>{
console.log("UPDATE.....",event,data);

var sql = QH.buildQuery(event.split(':/')[1]);
sql=mbuild.changeformat(sql,'^',':')
  console.log("this is newsql.......",sql)
connection.query(sql, function (err, result,fields) {
        console.log("connection.query")
                    var d={};
                    if (err) {
                             console.log("errr")
                            d["status"]='error';
                            d["data"]=err.toString();
                      }else{
                        d["status"]='success';
                        var k=result.rows;
                        var len=k.length
                        console.log(k.length)
                        var p=new Array();
                        for(var i=0;i<len;i++){
                                var arr=k[i]
                                var pk=values_only = Object.values(arr);
                                 p[i]=pk}
                        d["data"]=p
                     console.log(p);
                }
                console.log(event);
                  
                   pq.sendStream(event,JSON.stringify(d))
            });
            console.log("outside..query")
           
            saveEvent(event,sql)

});
pq.createStream("IMAGE",async(event,data)=>{
         console.log("IMAGE.....",event,data);
        
          var d= Buffer.from(data)
             dat=d.toString()
             console.log("IMAGE.....");
             up.uploadFile(dat[0],dat[1])
          console.log("outside..query")
                   
                
        
        });




      
pq.createStream("READ",(event,data)=>{
    console.log("READ.....",event,data);
    var sql = QH.buildQuery(event.split(':/')[1]);
    console.log(sql)
    connection.query(sql, function (err, result,fields) {
                    var d={};
                    if (err) {
                            d["status"]='error';
                            d["data"]=err.toString();
                    }else{
                        d["status"]='success';
               
                        var k=result.rows;
                        var len=k.length
                        console.log(k.length)
                        var p=new Array();
                        for(var i=0;i<len;i++){
                                var arr=k[i]
                                var pk=values_only = Object.values(arr);
                             
                               
                               p[i]=pk
                       
                        }
                        d["data"]=p

                   
                        
                       console.log(d["data"]);
                    }
                    pq.sendStream(event,JSON.stringify(d));
            });
            
});

  pq.createStream("WRITE",async(event,data)=>{
        var count=0;
        console.log("UI.....",event,data);
       var d= Buffer.from(data)
       dat=d.toString()
       
       
        var sql = QH.buildQuery(event.split(':/')[1])
        console.log(sql)
        var topicevent=QH.buildQuery(event.split(':/')[0])
        var table= QH.buildtablename(sql)
        console.log(table)
        var newsql=QH.makingNewInsertQuery(sql,topicevent,dat);
        console.log(newsql)



        sendDataChange = (t,data)=>{
                console.log("on se3nd data")
                console.log(t)
                console.log("on se3nd data")
             count=+1;
            
             console.log("dataarr....",data)
            // t=QH.buildhash(t)
             console.log("topic....",t)
             pq.sendStream(t,JSON.stringify(data))
             if (count==1)
             {
        
                if(table=="payment_out"||table=="site_expense"||table=="accountings"){
                        var format1=mbuild.changeformat(dat,'(','');
                        var format=mbuild.changeformat(format1,')','');
                        var array=format.split(',');
                              console.log("this......",array)  
                        try {
                                if (table=="payment_out"){
                                        var ned=[table,array[0],array[2],array[1],array[4]] 
                                        console.log(ned) 
                                        pq.sendStreamWithAcc(""+t+"",JSON.stringify(data),JSON.stringify(ned))
                                }
                                if (table=="site_expense"||table=="accountings"){
                                        var ned=[table,array[3]]  
                                        console.log(data)
                                        pq.sendStreamWithAcc(""+t+"",JSON.stringify(data),JSON.stringify(ned))
                                }
                                
                        } catch (error) {
                                
                        }        
                   
                      
                }}else{
                pq.sendStream(t,JSON.stringify(data))
                }
                
            
          
        }
          if (newsql.includes("UPDATE")) {
                console.log("The string contains 'UPDATE'");
                updateinsertion(newsql,table,event,sql,sendDataChange)
            } else {
                insertion(newsql,table,event,sql,sendDataChange)
            }
                     

        

});
      function updateinsertion(newsql,table,event,sql,sendDataChange){
        connection.query('BEGIN')
        console.log(newsql);
        connection.query(newsql, function (err, result,fields) {
                console.log(newsql)
             
           
                //updateuser(sql,pmkey,pmkeyvalue,len,k,event,table)
              
                streamOnDataChange(event,sql,sendDataChange) 
              connection.query('COMMIT')
               
 
      
      
      });



      }

        function insertion(newsql,table,event,sql,sendDataChange){     
                console.log(newsql)
                connection.query('BEGIN')
                 
                connection.query(newsql, function (err, result,fields) {
                        console.log(newsql)
                       var query="SELECT * FROM "+table+" ORDER BY created_at DESC LIMIT 1;"
                       
                      var d={};
                      connection.query(query, function (err, result,fields) {
                      if (err) {
                              d["status"]='error';
                              d["data"]=err.toString();
                      }
                      else{
                              var k=result.rows;
                              var len=k.length
                          
                              var p=new Array();
                              for(var i=0;i<len;i++){
                                      var arr=k[i]
                                      var pk=values_only = Object.values(arr);
                                      var pmkey= Object.keys(arr)[0];
                                      var pmkeyvalue= Object.values(arr)[0];
                                    
                                     p[i]=pk
                              }
                          
                              pq.sendStream(event,JSON.stringify(p))
                        }
                        updateuser(sql,pmkey,pmkeyvalue,len,k,event,table,sendDataChange)
                      
                      })
                       
         
              
              
              });
            //  streamOnDataChange(event,sql,sendDataChange) 
                connection.query('COMMIT')
                
   
         
        
}


function updateuser(sql,pmkey,pmkeyvalue,len,k,event,table,sendDataChange){

if(sql.split(" ")[0]=="INSERT"){
        for(i=0;i<len;i++){
                var arr=k[i]
                var pmkey= Object.keys(arr)[0];
                var pmkeyvalue= Object.values(arr)[0];
             
                userid=QH.buildQuery(event.split('/')[3])
                var qne="UPDATE "+table+" SET created_by='"+userid+"' WHERE "+pmkey+"='"+pmkeyvalue+"';"
              //  console.log(qne)
                connection.query(qne, function (err, result,fields) {
                        if (err) {
                            console.log("error")
                    
                        }else{
                            console.log("updated userid")
                            streamOnDataChange(event,sql,sendDataChange) 
                    
                        }
                    
                    });

              }


}



else{

 console.log("updated userid")
}}



