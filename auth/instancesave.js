const { spawn } = require('child_process');

const express = require('express');
const app = express()
app.use(express.json());

const serverPath = '../sernew/index';
class instancemaker{

  async instancecreate(k,res){
    // res.statusCode=200;

  console.log("starting for instance")
  var kn=0;
const serverArgs = [k[0],k[1],k[2],k[3],k[4]];
console.log(serverArgs)
// Spawn a child process for the server you want to start
const child = spawn('node', [serverPath, ...serverArgs]);


await child.stdout.on('data', (data) => {
 
console.log(`Server out: ${data}`);
this.s(k,res);
  // var p=[k[1],k[2]]
  // console("kkkkk",p)
  // return p;


});


child.stderr.on('data', (data) => {
  console.error(`Server error: ${data}`);
  // child.on('close', (code) => {
  //   console.log(`Server exited with code ${code}`);
  //   kn=1;
  // });
});

// console.log("ourrrr valueeee",kn)

 
}

s(k,res){
  // console.log("......coming",k,"........",res)
  

}
}
// Handle the child process exiting
// child.on('close', (code) => {
//   console.log(`Server exited with code ${code}`);
// });

module.exports={instancemaker}
