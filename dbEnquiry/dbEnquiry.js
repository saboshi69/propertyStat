const fs = require("nano-fs")


const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "test2",
        user: "test2",
        password: "test2"
    }
});

async function dbData (){
    let HK = await knex.select("sRegion", "price").from("alladdress").orderBy("price").where("bRegion", "HK")
    let HKarr = HK.map((u)=>{
        return [u.sRegion, u.price]
    })
    let NTW = await knex.select("sRegion", "price").from("alladdress").orderBy("price").where("bRegion", "NTW")
    let NTWarr = NTW.map((u)=>{
        return [u.sRegion, u.price]
    })
    return {
        HK: HKarr,
        NTW: NTWarr
    }
}

module.exports = dbData;