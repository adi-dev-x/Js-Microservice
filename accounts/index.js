var async= require('async')
const args = process.argv.slice(2); 
var db=args[0]
var PQ=args[1]
var QP=args[2]
var ip=args[3]
var sql=["select party_name,amount,pay_typ,pay_dte from payment_out order by prty_id desc;","select site.site_name,expense_amount,pay_typ,exp_dat  from site_expense left join site on site.site_id=site_expense.site_f_key order by site_exp_id desc;","select name,acc_no ,acc_holder_name, bank ,ifc_code, upid,amount,payment_type,as_of_date from accountings order by id desc;"]
const {update}=require('./src/update')
var k = new update();
// k.publisher("fliss")
console.log("{==p==-=-=-=}",db)
module.exports={db,PQ,QP,ip};
//module.exports=PQ,QP;
const { PowerQuery } = require("./src/powerQuery");
const { MqttAdapter } = require("./src/mqttAdapter");


const {Client} = require('pg');
var QH =require("./src/queryHash");



const connection =  new Client({
        host: '3.112.219.214',
        user: 'postgres',
        // database: ''+db_name+'',
        database: db,
        password: '1234',
        port: 5432,
});



connection.connect();


console.log("Binding powerquery");
pq = new PowerQuery(new MqttAdapter());



pq.createStream("ACCOUNT",async(event,data)=>{
 // var data=[];
  console.log("acccccccc.....",event,data);
  var d= JSON.parse(data)
  // var d= Buffer.from(data)
  // d=d.toString()
  console.log(d,d[0],d[1])
  // try {
    if (d[0]=="payment_out"){
      try {
       
        // var sql="select party_name,amount,pay_typ,pay_dte from payment_out where prty_id='"+d[1]+"';";
        // var { rows } = await connection.query(sql);

        // console.log(rows)
       
        // var value=[d[0],rows[0].party_name,rows[0].amount,rows[0].pay_typ,rows[0].pay_dte];
        
       
        insert(d);
        
      } catch(error) {
        console.log("error")
      }

    }
    if (d[0]=="site_expense"){
      console.log("hi...............12122",d[1])
      try {
        console.log("hi...............12122",d[1])
        var sql="select site.site_name,expense_amount,pay_typ,exp_dat  from site_expense left join site on site.site_id=site_expense.site_f_key where site_exp_id="+d[1]+";"
       console.log(sql)
        var { rows } = await connection.query(sql);
        // console.log(rows)
        // for(var i=0;i<rows.length;i++){
        //         var val={party:rows[i].site_name,amount:rows[i].expense_amount,type:rows[i].pay_typ,date:rows[i].exp_dat,datet:rows[i].exp_dat,category:"site"}
        //        data.push(val)
        //         }
        var value=[d[0],rows[0].site_name,rows[0].expense_amount,rows[0].pay_typ,rows[0].exp_dat];
        console.log("hi...............12122",value)
        insert(value);
      } catch(error) {
        console.log("error")
      }
   

    }
    if (d[0]=="accountings"){
      try {
        var sql="select name,acc_no ,acc_holder_name, bank ,ifc_code, upid,amount,payment_type,as_of_date from accountings where id='"+d[1]+"';"
        var { rows } = await connection.query(sql);
        // console.log(rows)
        // for(var i=0;i<rows.length;i++){
        //         var val={party:rows[i].site_name,amount:rows[i].expense_amount,type:rows[i].pay_typ,date:rows[i].exp_dat,datet:rows[i].exp_dat,category:"site"}
        //        data.push(val)
        //         }
        var value=[d[0],rows[0].name+","+rows[0].acc_no+","+rows[0].acc_holder_name+","+rows[0].bank+","+rows[0].ifc_code+","+rows[0].upid,rows[0].amount,rows[0].payment_type,rows[0].as_of_date];
        insert(value);
      } catch(error) {
        console.log("error")
      }
   

    }

    
  // } catch (error) {
    
  // }

      
    
  

});  

async function insert(v){
  var sql="insert into transaction (tabname,party,amount,type,as_date) VALUES('"+v[0]+"','"+v[1]+"','"+v[2]+"','"+v[3]+"','"+v[4]+"');"
  console.log(sql)
  connection.query(sql);
}