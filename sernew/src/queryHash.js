function buildhash(Q){
    //TODO handle once&write by appending a key 
    console.log("PowerQuery hashing....");
    var mapObj = {
      "\*":"-BLU-",
      "\#":"-BLUBLU-",
      "\.":"-BLUBLUBLU-",
      "\+":"-BLUBLUBLUBLU-",
      "\/":"-BLUBLUBLUBLUBLU-",
      " ":"\."
   };
   return Q.replace(/\.|\#|\*|\+|\/| /gi,function(matched){
    return mapObj[matched];
  });
    
  }

  function buildQuery(H){
    //TODO handle once&write by appending a key 
    console.log("PowerQuery makeQuery....");
    var mapObj = {
      "-BLU-":"\*",
      "-BLUBLU-":"\#",
      "-BLUBLUBLU-":"\.",
      "-BLUBLUBLUBLU-":"\+",
      "-BLUBLUBLUBLUBLU-":"\/",
      "\/":" "
   };
   return H.replace(/(-BLU-)|(-BLUBLU-)|(-BLUBLUBLU-)|(-BLUBLUBLUBLU-)|(-BLUBLUBLUBLUBLU-)|\//gi,function(matched){
    return mapObj[matched];
  });
}
  function buildEvent(H){
    
    console.log("PowerQuery makeQuery....");
    return H.replace(/\//gi,".");
    
  }

  function parseEventType(H){
    return H.split('/').slice(1,2);
  }
  function buildtablename(sql){
    if(sql.split(" ")[0]=="INSERT"){
    Tablename= sql.split(" ")[2];
   }else if(sql.split(" ")[0]=="SELECT"){
    Table= sql.split(" ");
    Tablename=Table[Table.indexOf("FROM")+1]
   }else if(sql.split(" ")[0]=="select"){
    Table= sql.split(" ");
    Tablename=Table[Table.indexOf("FROM")+1]
   }
   else{
    Tablename= sql.split(" ")[1];
   }
    console.log(Tablename)
    return Tablename;


  }


  function makingNewInsertQuery(sql,topicevent,dat){
    console.log("makingNewInsertQuery",".........",dat)
  if(dat=="" ){
   return(sql+";");
   }
   else{
    return(sql+" VALUES "+dat+";");
   }
 

  }


  function replacequery(sql,dat){
    const newStr = sql.split(')').join(',updated_at)');
  }
  



  module.exports = {buildhash,buildQuery,buildEvent,parseEventType,buildtablename,makingNewInsertQuery}
