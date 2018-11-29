const fs = require("fs")
let arr = [];

const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "test_region",
        user: "test",
        password: "test"
    }
});

fs.readFile("NTE2018.json", "utf8", async (err, data)=>{
    if (err) console.log (err)
    let parsed = JSON.parse(data);
    console.log (parsed.length);
    
    for (let i=0; i<parsed.length; i++){
        parsed[i].id = i+1
        await arr.push (parsed[i])
    }
    await arr.map((u)=>{
        let age = u.age;
        let date = u.date;
        let aA = u.actualArea;
        let gA = u.grossArea;
        let p = u.price;
        let aP = u.actualPrice;
        let gP = u.grossPrice;
        let lat = u.lat;
        let lng = u.lng;
        u.age = Number(age);
        u.date = `20${date.slice(6)}-${date.slice(3,5)}-${date.slice(0,2)}`
        u.actualArea = Number(aA.replace(/s.f./, ""));
        u.grossArea = Number(gA.replace(/s.f./, ""));
        u.price = Number(p.slice(1,-1));
        u.actualPrice = Number(aP.slice(1));
        u.grossPrice = Number(gP.slice(1));
        u.lat = Number(lat);
        u.lng = Number(lng);
    })
    console.log (arr)
    await knex('testTable').del();
    await knex("testTable").insert(arr);
    let address = await knex.select("address", "date", "id").from("testTable").orderBy("date").where("sRegion", "Sai Kung").andWhere("price", "<", "7")
    console.log (address)
})

// //for testing database
// (async function (){
//     let address = await knex.select().from("testTable").orderBy("date").where("sRegion", "Sai Kung").andWhere("price", "<", "7")
//     console.log (address)
// })();

