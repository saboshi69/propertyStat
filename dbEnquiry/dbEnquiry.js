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

function filterRegion(arr, u){
    let x = false;
    for (let element of arr){
        if (u.sRegion == element){
            x = true
        }
    }
    return x
}

 let dummy = { sRegion: [ 'Mid Level West', 'Olympic Station', 'Kowloon Station' ],
  actualArea: [ '600-1000' ],
  price: [ '>10' ],
  actualPrice: [] }

async function dbData (json){
    let jsonArr = await _.toPairs(json).filter((u)=>{return u[1][0] != undefined})
    let result = await knex.select("sRegion","actualArea", "price", "actualPrice", "lat", "lng").from("alladdress")
    for (let col of jsonArr){
        // console.log (col[0], col[1][0])
        if (col[0] == "sRegion"){
             result = await result.filter((u)=>{
                 return filterRegion(col[1], u)
             })
        } else {
            if (col[1][0].includes("<")){
                result = await result.filter((u)=>{
                    return u[`${col[0]}`] < Number(col[1][0].slice(1))
                })
            } else if (col[1][0].includes(">")){
                result = await result.filter((u)=>{
                    return u[`${col[0]}`] > Number(col[1][0].slice(1))
                })
            } else {
                let arr = col[1][0].split("-");
                result = await result.filter((u)=>{
                    return u[`${col[0]}`] > Number(arr[0]) && u[`${col[0]}`] < Number(arr[1])
                })
            } 
        }
    }
    return result
}


module.exports = dbData;



//latlng as number
//address as single line
//db include phone