var async= require('async')
const {db,PQ,QP} = require("../index");
console.log('sdsdsds///////',db)


const {Client} = require('pg');







var QH =require("./queryHash");

const connection =  new Client({
  host: '13.201.76.112',
  user: 'postgres',
 database: ''+db+'',
// database: "employ",
 password: 'aalbot',
 port: 5432,
});
connection.connect();
var metadata=[]
async function listing(){
    var loaddata="SELECT topicname,created_at FROM update ;"
    connection.query(loaddata, async function (err, result,fields) {
        if (err) {
            console.log("error")
    
        }else{
            var p=result.rows;
            if(p==0){
                console.log("none")
            }else{
                console.log(p)
                // var kt=[]
              for(i=0;i<result.rows.length;i++){
             
                topicname=result.rows[i].topicname
                created_at=result.rows[i].created_at.toISOString().slice(0, 19).replace('T', ' ');
                
                 var pn=new metabuilder(topicname,created_at)
                //   tab={topic:topicname, time:created_at}
                       
                metadata.push(pn.value)     
                    
    
              }   
              
          }
           
        }
        console.log(metadata)
       
    });
    
    
}

 function entry(queries){
    
    //console.log("save data from update table",loaddata)
    connection.query(queries, function (err, result,fields) {
        if (err) {
            console.log("error")
    
        }else{
            var p=result.rows;
            if(p==0){
                console.log("none")
            }else{
                //console.log(p)
                // var kt=[]
              for(i=0;i<result.rows.length;i++){
                
                topicname=result.rows[i].topicname
                created_at=result.rows[i].created_at
                 tab={topic:topicname, time:created_at}
                       
                   metadata.push(tab) 
                   console.log(tab)   
    
              }   
              
             
             
             
         
             
          
            }
        }
       
    });
}
 
 function saveEvent(event,sql){
 
    var from="'"
    var to="§"
  
     table =QH.buildtablename(sql)
     console.log(table)
     arr=sql.split(" ")
   
    var kadd="";
    for(i=0;i<arr.length;i++){
         kadd=kadd+"/"+arr[i]

    }
   
     //console.log(event)
    event=changeformat(event,from,to);

  
    
     if(metadata.length==0){
        console.log("countis0")
        insertingUpdatetable(event);
     }
     else if(metadata.length>0){
        var count=0;
    for(i=0;i<metadata.length;i++){
       
      k=event.split(":")[1]
        if(k==metadata[i].topic){
        
            count=+1;
            metadata[i].time= new Date().toISOString().slice(0, 19).replace('T', ' ');
            time=metadata[i].time
            event=event.split(":")[1]
            // metadata=metadata.splice(i, 1)
            // console.log(metadata)
            updatingtime(event,time)
            break;
            
        }

      }
      console.log(count)
      if (count==0){
        console.log("countis0")
        insertingUpdatetable(event);
      }else{
        console.log("there")
      }
}


}
function updatingtime(event,time){
  console.log("dsacsacascascsa---3-3-3-3-3-3")
  console.log(metadata)
  console.log("dsacsacascascsa---3-3-3-3-3-3")
 
  // var upsql="INSERT INTO update (topicname,created_at) VALUES ('"+event+"','"+time+"');"
  var upsql="UPDATE update SET created_at = '"+time+"' WHERE topicname = '"+event+"';"
  console.log("111222332222111",upsql)
connection.query(upsql, function (err, result,fields) {
    if (err) {
        console.log("error")

    }else{
        console.log("updating")
        // var loaddata="SELECT topicname,created_at FROM update WHERE topicname='"+event+"' ;"
        // console.log(loaddata)
        // entry(loaddata)

    }

});
  


}
async function insertingUpdatetable(event){
  event=event.split(":")[1]
    var upsql="INSERT INTO update (topicname) VALUES ('"+event+"');"
    console.log("111222332222111",upsql)
  connection.query(upsql, function (err, result,fields) {
      if (err) {
          console.log("error")
  
      }else{
          console.log("updating")
          var loaddata="SELECT topicname,created_at FROM update ORDER BY upid DESC LIMIT 1 ;"
          entry(loaddata)
  
      }
  
  });

}




async function streamOnDataChange(event,sql,fn){
    console.log("on datachande...",sql,event)
   
   
    var table=QH.buildtablename(sql)
    console.log(table)
    comparingTwoQueries(table,fn)


}



function comparingTwoQueries(table,fn){
  // console.log("ghvghvghv",query)
  var poc=new metabuilder("xsad")

  var from="§"
  var to="'"

  var storeindex=[]
  //var timeindez=[]
  

   for(i=0;i<metadata.length;i++){
    
   
    tablem=poc.table(metadata[i].topic)
    
       if(tablem==table){
     
        
        storeindex.push(i)

       }
        
    }//console.log("tiiiiii---------",timeindez)
 
    
    //console.log("tiiiiii---------",latestUpdatetime)

    var double=[]
     for(i=0;i<storeindex.length;i++){
        topic=changeformat(metadata[storeindex[i]].topic,from,to)
       
       // var latestUpdatetime=metadata[storeindex[i]].time.toISOString().slice(0, 19).replace('T', ' ');
       var sql = QH.buildQuery(topic);
       console.log(sql)
       //sql=poc.gettingsql(topic)
    
      topic=QP+"/UPDATE/:"+topic
   

 
    

  //  var comparingsql=poc.conditions(topic,latestUpdatetime)
  //var comparingsql=sql
    var p=[topic,sql]
    console.log(p)
    console.log(sql)
    //newsqarr.push(comparingsql)
   //console.log(comparingsql)
   double.push(p);
    
   }
   toCombinedata(fn,double)
  //  toCombinedata(fn,toparr,newsqarr)
    // var topic=


}
function toCombinedata(fn,double){
  console.log(double)
    //console.log("comparing 4r44 4555 query....",toparr)
    //var dataarr=[]
   for(i=0;i<double.length;i++){
    //console.log("....ada......ada...../",toparr[i])
    var h=double[i]
    console.log(h)
    var topic=h[0]
    //var topic=toparr[i]
    var d={}
    var sql=h[1]
    inserter(sql,topic,d,fn)
   }
   //fn(toparr,dataarr);
   //console.log(dataarr)
   
}
function inserter(sql,topic,d,fn){
  connection.query(sql, function (err, result,fields) {
    //console.log(newsqarr[i])
    //var topic=h[0]
    console.log(topic)
    
     if (err) {
         console.log("error")
         
     }else{
         var p=result.rows;
         if(p==0){
             console.log("none")
         }else{
             d["status"]='success';
            var k=result.rows;
             var len=k.length
             //console.log(k.length)
             var p=new Array();
             for(var i=0;i<len;i++){
                     var arr=k[i]
                     var pk=values_only = Object.values(arr);
                   p[i]=pk
               }
               d["data"]=p
               
             //d.push(p)
             //dataarr.push(p)
            //console.log(d)
            fn(topic,d);
           }

        
     }
    // console.log(toparr[i])
   // console.log("acscacs.....acsac/ascasc",topic)
   //  var t=""+topic+"";
   // var t=topic;
   // console.log(t)
  
     
    //console.log(dataarr)

})
}

function changeformat(value,from,to){
      
    if (value.indexOf(from) === -1) {
        console.log("Character to replace not found in string");
        return value;
      } else {
        return value.split(from).join(to);
      }
  }
class meta{
  changeformat(value,from,to){
      
    if (value.indexOf(from) === -1) {
        console.log("Character to replace not found in string");
        return value;
      } else {
        return value.split(from).join(to);
      }
  }
}
class metabuilder{
    
    constructor(topicname,created_at){
      this. topicname= topicname;
      //this.created_at= created_at.toISOString().slice(0, 19).replace('T', ' ');
      this.created_at= created_at;
      this.sql=this.gettingsql(topicname);
      this.tablename=this.table(topicname)
      
      this.value={topic:this.topicname, time:created_at}

    }
   
    gettingsql(topicname){
     // console.log
      var n= topicname.replace(QP+"/UPDATE/:/","")
      
      return this.changeformat(n,"/"," ")
      
    }
    table(topicname){
      //console.log("sdsds",sql)
      var tabled=topicname.split("/")
      var c=(tabled.indexOf("FROM"))+1
     return tabled[c];
     
    }
    changeformat(value,from,to){
      
        if (value.indexOf(from) === -1) {
            console.log("Character to replace not found in string");
            return value;
          } else {
            return value.split(from).join(to);
          }
      }
      conditions(topicname,latestUpdatetime){
        var k= topicname.replace(QP+"/UPDATE/:/","")
        var table=this.table(topicname)
       // sql="SELECT site site_name,site site_id,site owner_name,employee designation,site_expense expense_amount,site_expense previous_advance,site_expense advance_required,to_char(site_expense exp_dat,'DD-MM-YYYY') as exp_dat FROM site_expense LEFT JOIN site ON site site_id=site_expense site_f_key LEFT JOIN employee ON employee empid=site_expense employee_f_key WHERE site_expense user_perm = '1' AND site_expense is_deleted= '0';"
       // SELECT site site_name,site site_id,site owner_name,employee designation,site_expense expense_amount,site_expense previous_advance,site_expense advance_required,to_char(site_expense exp_dat,'DD-MM-YYYY') as exp_dat FROM site_expense LEFT JOIN site ON site site_id=site_expense site_f_key LEFT JOIN employee ON employee empid=site_expense employee_f_key WHERE site_expense user_perm = '1' AND site_expense is_deleted= '0';";
        var ar=k.split("/")
        if((ar.indexOf("WHERE")>0 )&& (ar.indexOf("ORDER")>0 )){
         
          if (ar.indexOf(";") === -1) {
              var b=ar.indexOf("ORDER")
              ar.splice(b-1, 0, "AND "+table+".created_at<='"+latestUpdatetime+"'")
               var value= ar.join().replace(/,/g, " ");
           value=value+" ;"
           return value;
         } 
          else {
           var b=ar.indexOf("ORDER")
           ar.splice(b-1, 0, "AND "+table+".created_at<='"+latestUpdatetime+"'")
           var value= ar.join().replace(/,/g, " ");
           value=value
         }
        } 
        else if((ar.indexOf("WHERE")>0 )){
            var g=ar.length
            //console.log(ar[g-1].indexOf(";"))
            if((ar[g-1].indexOf(";"))>0){
            //    var mg=ar[g-1]
            //   var mk= ar[g-1].replace(/;/g, " ");
              sql=sql.replace(";","")
                var value=sql+" "+"AND "+table+".created_at<='"+latestUpdatetime+"';"
             return value;
           }
           
        else if (ar.indexOf(";") === -1) {
          
         var value=sql+" "+"AND "+table+".created_at<='"+latestUpdatetime+"';"
          return value;
        }
        
        else {
          sql=sql.replace(";","")
          var  value=sql+" "+"AND "+table+".created_at<='"+latestUpdatetime+"';"
          return value;
        }
      } else if(ar.indexOf("ORDER")>0){
    
          if (ar.indexOf(";") === -1) {
                 var b=ar.indexOf("ORDER")
                 ar.splice(b, 0, "WHERE "+table+".created_at<='"+latestUpdatetime+"'")
                 var value= ar.join().replace(/,/g, " ");
              value=value+" ;"
              return value;
            } else {
              var b=ar.indexOf("ORDER")
              ar.splice(b, 0, "WHERE "+table+".created_at<='"+latestUpdatetime+"'")
              var value= ar.join().replace(/,/g, " ");
              value=value
            }
          }
            else {
    
              if (ar.indexOf(";") === -1) {
              
                  var  value=sql+" "+"WHERE "+table+".created_at<='"+latestUpdatetime+"';"
                  return value;
                } else {
                  sql=sql.replace(";","")
                  var  value=sql+" "+"WHERE "+table+".created_at<='"+latestUpdatetime+"';"
                  return value;
                }
    
              }
      
    
    
    
     }  
 




}
module.exports = {streamOnDataChange,listing,saveEvent,metabuilder,meta}
