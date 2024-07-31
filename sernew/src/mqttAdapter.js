const process = require('process');
const { Adapter } = require("./powerQuery");
const{metabuilder}=require("./eventDistributer")
const mqtt = require("mqtt");
var async = require("async");
const EventEmitter = require("events");
 const {PQ,QP,ip,iden}=require("../index")
// const QP=require("../index")
 console.log("+++33+++3+#",PQ,QP)

const key="instance."+Math.floor(100000000 + Math.random() * 900000)+"."+""+iden+""+".:";
class MqttAdapter extends Adapter{
    start(){
        console.log("starting mqtt");
        this.Client = mqtt.connect("mqtt://"+ip+":61616",{clientId:key.replace("/\./gi","")+process.pid,username: "artemis", password:"aalbot"});
        //this.Client = mqtt.connect("mqtts://3253273afd204899a7776ce250dd94f6.s2.eu.hivemq.cloud:8883",{clientId:key.replace("/\./gi","")+process.pid,username: "aalbot", password:"aalbot@123"});
        var client=this.Client;
        var listener=this.listener;
        var myn=this;

        client.on("connect", function () {
            console.log("connected", client.connected);
            // this.Client.subscribe("PQ.*");
            client.subscribe(PQ+"/#");
            console.log("client subscribed")
            //TODO ENIT MQQT CONNECT
            listener.onNotifiStatus("connect", client.connected);
          });

          client.on("reconnect", function () {
            console.log("reconnected", client.reconneted);
            listener.onNotifiStatus("reconnect", client.reconnected);
          });
          
          client.on("error", function (error) {
            console.log("cant connect" + error);
            listener.onNotifiStatus("error", error);
          });
          
          client.on("message", function (topic, message) {
            console.log("message is" + message,"topic is" + topic);
           console.log("3wwwww3",topic.replace(PQ, QP))
           listener.onReciveStream(topic.replace(PQ, QP), message);
            // listener.onReciveStream(topic.replace(/^.{2}/g, QP), message);
          });
          client.on("close", function () {
            console.log("closed", client.closed);
            listener.onNotifiStatus("close", client.closed);
          });
        
    }

    send(event,data) {
      this.Client.publish(event, data);
    }
    sendAcc(event,data,formated) {
      var p="PQ2/ACCOUNT/l"
      this.Client.publish(event, data);
     this.Client.publish(p,formated);
    }

   
    addHoock(ref){
      this.Client.subscribe(ref);
    }
    removeHoock(ref){
      this.Client.unsubscribe(ref);
    }
    end(){
      this.Client.end;
    }
}
module.exports = {MqttAdapter}