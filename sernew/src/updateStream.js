var async= require('async')
var QH =require("./queryHash");

table=[]
sqlarr=[]
topicarr=[]
async function buildTable(event,sql){
    var Tablename = QH.buildtablename(sql);
    console.log(Tablename)
   
    table.push(Tablename)
    sqlarr.push(sql)
    topicarr.push(event)
    console.log(table,sqlarr)
    console.log("```````````~~~~~~~~~~```````````",event,sql)
    storingtable(table,sqlarr,topicarr)
}

async function storingtable(table,sqlarr,topicarr){

    let unique = [];
    for(i=0; i < table.length; i++){ 
        if(unique.indexOf(table[i]) === -1) { 
            unique.push(table[i]); 
        } 
    }
    console.log("takein",sqlarr,"lllllllllllllll",topicarr,"mmmm",unique)
    takingIndifferentables(unique,sqlarr,topicarr);
}

 function takingIndifferentables(unique,sqlarr,topicarr){
 
   
    newupdated_array={}
    for(i=0;i<unique.length;i++){
       k=unique[i]
//////////need new logic
       newsqlarr=[]
        for(l=0;l<sqlarr.length;l++){
            var checkTablename = QH.buildtablename(sqlarr[l]);
           if(k==checkTablename){
            newsqlarr.push(sqlarr[l])

           }


        }
        newupdated_array[k]=[
            k["sql"]=newsqlarr,
            k["topic"]=""
            ]

    }
    console.log(newupdated_array)
    console.log("dobeeee")
    return newupdated_array;


}


module.exports = {buildTable,storingtable}