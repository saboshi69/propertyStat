const fs = require("nano-fs")
const _ = require("lodash")

const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "test2",
        user: "test2",
        password: "test2"
    }
});



// function singleSort (column){
//     if (element[1].includes("<") || element[1].includes(">")){
//         result = result.where(`${column}`,element[1][0], element[1].slice(1))
//     } else {
//         let arr = element[1].split("-");
//         result = result.where(`${column}`, ">", arr[0]).andWhere(`${column}`, "<", arr[1])
//     } 
// }

async function dbData (data){
    let json = JSON.parse(data)
    let sRegions = json.sRegions;
    let aA = json.aA;
    let p = json.p;
    let aP = json.aP;
    let length = Object.values(json).map((u)=>{return u[0]}).filter((u)=>{return u != undefined}).length;
    let jsonArr = _.toPairs(json).filter((u)=>{return u[1]>0})
    let result = await knex.select("sRegion", "price").from("alladdress")
    
}

module.exports = dbData;


// if (jsonArr.length == 1){
//     for (let element of jsonArr){
//         if (element[0] == "sRegions"){
//             result = result.whereIn("sRegions", element[1])
//         } else if (element[0] == "aA"){
//             sort("actualArea")
//         } else if (element[0] == "p"){
//             sort("price")
//         } else if (element[0] == "aP"){
//             sort("actualPrice")
//         }
//     }
// } else if (jsonArr.length > 1) {
//     for (let i = 0; i<jsonArr.length; i++){
//         if (i == 0){
            
//         }
//     }
// } else {
//     reject();
// }