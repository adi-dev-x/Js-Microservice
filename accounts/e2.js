
const EventEmitter = require("events");

// streams = new EventEmitter();
class uploads{
    streams = new EventEmitter();
   
    async pling(name,array){
     
    
        
       this.streams.emit(name,array);
        
 
 
    }
    creating(type,fn){
        this.streams.on(type,fn);
    }
    chumma(){
        console.log("fundee")
    }
 
 
 }
//  var k= new uploads();
//  k.creating("png",(nam)=>{
//   console.log(nam)

//  })
 
 module.exports={uploads}