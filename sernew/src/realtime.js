const EventEmitter = require("events");
const {Client} = require('pg');
const NodeCache = require( "node-cache" );
const cache = new NodeCache();
const connection =  new Client({
    host: '3.112.219.214',
      user: 'postgres',
      // database: ''+db_name+'',
      database: db,
      password: '1234',
      port: 5432,
  });
 var topicarr=[]
updatesrteam = new EventEmitter();

 class eventsaver{
  load(){
    var loaddata="SELECT topicname FROM update;"
    connection.query(loaddata, function (err, result,fields) {
      if (err) {
          console.log("error")
  
      }else{
          console.log("updating")
          var loaddata="SELECT topicname,created_at FROM update ORDER BY upid DESC LIMIT 1 ;"
          entry(loaddata) 
  
      }
  
  });

  }

   saveEvent(event,sql){
 
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
    event= this.changeformat(event,from,to);

   this.insert(event,table);
   
  



}

   insert(event,table) {
    const keys = cache.keys();
    var foundKey=1;
     for(var i=0;i<keys.length;i++){
      if(event==keys[i]){
        foundKey=0
        console.log(foundKey)

        return foundKey;
      }
     }
     if(foundkey==0){
      var time=new Date().toISOString().slice(0, 19).replace('T', ' ');
       cache.set(event,time)

     }
     else{
      var time=new Date().toISOString().slice(0, 19).replace('T', ' ');
      var upsql="UPDATE update SET created_at = '"+time+"' WHERE topicname = '"+event+"';"
      connection.query(upsql, function (err, result,fields) {
        if (err) {
            console.log("error")
    
        }else{
            console.log("updating")
            var time=new Date().toISOString().slice(0, 19).replace('T', ' ');
            cache.set(event,time)
    
        }
    
    });
  }
  }
  async changeformat(value,from,to){

  if (value.indexOf(from) === -1) {
    console.log("Character to replace not found in string");
    return value;
  } else {
    return value.split(from).join(to);
  }
  }
 
 







}


 


