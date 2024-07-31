
var async = require("async");
const EventEmitter = require("events");
var QH =require("./queryHash");
class Adapter {
  listener;
  constructor() {
    if (this.constructor == Adapter) {
      throw new Error("object cannot be created");
    }
  }
  on(fn) {
    return (this.listener = fn);
  }
  start() {
    throw new Error("not impl");
  }
  send(event,data) {
      throw new Error("not impl");
  }
  
  addHoock(to,from){
    throw new Error("not impl");
  }
  removeHoock(to,from){
    throw new Error("not impl");
  }
  end(){
    throw new Error("not impl");
  }
}

class QueryListener{
    async onReciveStream(event,status,data){
        throw new Error("not impl");
    }
    onNotifiStatus(event,msg){
        throw new Error("not impl");
    }
}

class PowerQuery extends QueryListener{
    stream = new EventEmitter();
   
    adapter;
    isLive=false;
    constructor(mqa) {
      super();
      console.log("PowerQuery init....");
        this.adapter=mqa;
        this.adapter.on(this);
        this.adapter.start();
    }
    async onReciveStream(event,data){     
      console.log("PowerQuery stream....",event,200);
      //
      console.log("emiting",QH.parseEventType(event),data);
      this.stream.emit(QH.parseEventType(event),event,data);
      
    }
    onNotifiStatus(event,msg){
      console.log("PowerQuery notification....",event,msg);
      switch(event){
        case "connect":
        case "reconnect":          
          this.isLive=(msg==undefined?false:msg);
          break;
        case "error":
        case "close":
          this.isLive=false;
          break;

      }
      console.log("PowerQuery status....",this.isLive);
    }
    sendStream(event,data){
     
      this.adapter.send(event,data);
    }
    createStream(type,fn){
      this.stream.on(type,fn);
    }
    sendStreamWithAcc(event,data,formated){
     
      this.adapter.sendAcc(event,data,formated);
    }
 

    end(){
      this.stream.end();
      this.adapter.end();
    }
    //
    

  }
  

  module.exports = { PowerQuery ,Adapter}