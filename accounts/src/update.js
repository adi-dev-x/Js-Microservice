const EventEmitter = require("events");
 var topicarr=[]


 class eventsaver{
  async savingtopic(t){
    if (topicarr.length==0){
        topicarr.push(t);
    }else{
    let found = topicarr.find(element => element === t);

if (found !== undefined) {
  console.log("topic exists in the array");
} else {
    topicarr.push(t);
}
  


  }
  console.log(topicarr)
}
 }





 class update extends eventsaver{

    updatestream = new EventEmitter();


    // updatestream.on('myEvent', (data) => {
    //     console.log('Event triggered:', data);
    //   });
    constructor(){
        super();
           this.updatestream.on('eventacc', (data) => {
        console.log('Event triggered:', data);
          this.savingtopic(data)
      });

    }
    async publisher(t){
        this.updatestream.emit("eventacc",t);
    }




}

module.exports={update}