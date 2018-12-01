const fs = require("fs")
const util = require('util');
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);


async function jsonName(){
    return await readdir("./data",  "utf8")
}


async function getAddJson(fileName) {
    return await readFile(`./data/${fileName}`, "utf8")
}

async function cleanAddJson(data) {
    return data.replace(/[$]/gmi, ' ')
}

async function writeAddJson(data, fileName) {
    await fs.writeFile(`./data/${fileName}`, data, (err) => (err) ? console.log("oops..!" + err) : console.log("writeFile success"))
}



jsonName()
.then((data)=>data.forEach((el)=>{
    getAddJson(el)
    .then((data)=>cleanAddJson(data))
    .then((data)=>writeAddJson(data, el))
}))

//lat":"38.083403","lng":"-122.7633036"