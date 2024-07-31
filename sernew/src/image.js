console.log("inside multer")
const fs = require('fs');
const EventEmitter = require("events");
//const sharp = require('sharp');
const Jimp = require('jimp');
const PDFDocument = require('pdfkit');
const dirPath = '../files';
streams = new EventEmitter();
class uploads{
    
    async uploadFile(name,array){
     console.log("inside uploadfile")
        var arr=name.split('.')
        const type=arr[1]
      var array=[array]
        console.log("inside png................")
        const fileName = name;
        const buffer = Buffer.from(array.toByteArray());
        const width = Math.ceil(bitarray.length() / 4);
    const height = 1;
    const image = new Jimp(width, height);
    for (let i = 0; i < bitarray.length(); i++) {
    const x = Math.floor(i / 4);
    const y = 0;
    const value = buffer.readUInt8(Math.floor(i / 8));
    const pixelValue = (value >> (i % 8)) & 1;
    const color = pixelValue === 0 ? 0x000000ff : 0xffffffff;
    image.setPixelColor(color, x, y);
    }
    //  ${dirPath}${fileName}
    image.write(`${dirPath}${fileName}`, (err) => {
    if (err) throw err;
    console.log('Image saved!');})
        streams.emit(type,name,array);
        
 
 
    }
    creating(type,fn){
        streams.on(type,fn);
    }
 
 
 }
 var k=new uploads();


 k.creating("png",(nam,array)=>{
    console.log("inside png................")
    const fileName = nam;
    const buffer = Buffer.from(array.toByteArray());
    const width = Math.ceil(bitarray.length() / 4);
const height = 1;
const image = new Jimp(width, height);
for (let i = 0; i < bitarray.length(); i++) {
const x = Math.floor(i / 4);
const y = 0;
const value = buffer.readUInt8(Math.floor(i / 8));
const pixelValue = (value >> (i % 8)) & 1;
const color = pixelValue === 0 ? 0x000000ff : 0xffffffff;
image.setPixelColor(color, x, y);
}
//  ${dirPath}${fileName}
image.write(`${dirPath}${fileName}`, (err) => {
if (err) throw err;
console.log('Image saved!');})





 })
 k.creating("pdf",(nam,array)=>{
    const fileName = nam;
    const buffer = Buffer.from(array.toByteArray());
    const doc = new PDFDocument();
  
try {
    doc.pipe(fs.createWriteStream(`${dirPath}${fileName}`));
    doc.image(buffer, 0, 0);
    doc.end();
} catch (error) {
    console.log("error")
}


 })
 k.creating("jpg",(nam,array)=>{
    console.log("inside jpg",nam)
    const fileName = nam;
    const buffer = Buffer.from(array.toByteArray());
    // Create a new JPEG image
const width = Math.ceil(bitarray.length() / 3);
const height = 1;
const pixels = new Uint8Array(width * height * 3);
for (let i = 0; i < bitarray.length(); i++) {
  const pixelValue = buffer.readUInt8(Math.floor(i / 8));
  const channel = i % 3;
  const x = Math.floor(i / 3);
  pixels[x * 3 + channel] = pixelValue;
}
const jpegImageData = {
  data: pixels,
  width,
  height,
};
const jpegData = jpeg.encode(jpegImageData, 100);

try {
    fs.writeFileSync('image.jpg', jpegData.data); 
    console.log('JPEG image saved!');
} catch (error) {
    console.log('JPEG image not saved!');
}
 })    
 module.exports = uploads;