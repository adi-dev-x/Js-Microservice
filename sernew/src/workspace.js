
const EventEmitter = require("events");

workspace = new EventEmitter();
class workspaces{
    async uploadFile(name,array){
     
        var arr=name.split('.')
        const type=arr[1]
        
        workspace.emit(type,name,array);
        
 
 
    }
    creating(type,fn){
        workspace.on(type,fn);
    }
 
 
 }
 var k=new workspaces();

module.exports={workspaces}
