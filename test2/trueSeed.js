const fs = require("nano-fs")


const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "test2",
        user: "test2",
        password: "test2"
    }
});

// (async function exp() {
//     let arr = [];
//     let dir = await fs.readdir(`/mnt/c/Users/Matthew/Documents/Github/matthewlee/2ndProj/pullSamuel/getAddressID/data`)
//     let ntwArr = dir.filter((u) => u.includes("NTW"))
//     console.log(ntwArr)
//     await knex('testntw').del();
//     for (let element of ntwArr) {
//         arr.length = 0;
//         let data = await fs.readFile(`/mnt/c/Users/Matthew/Documents/Github/matthewlee/2ndProj/pullSamuel/getAddressID/data/${element}`, "utf8")

//         let parsed = JSON.parse(data);
//         console.log(parsed.length);

//         for (let i = 0; i < parsed.length; i++) {
//             await arr.push(parsed[i])
//         }

//         await arr.map((u) => {
//             let age = u.age;
//             let date = u.date;
//             let aA = u.actualArea;
//             let gA = u.grossArea;
//             let p = u.price;
//             let aP = u.actualPrice;
//             let gP = u.grossPrice;
//             let lat = u.lat;
//             let lng = u.lng;
//             u.age = (age != "-") ? Number(age) : null;
//             u.date = `20${date.slice(6)}-${date.slice(3, 5)}-${date.slice(0, 2)}`
//             u.actualArea = (aA != "-") ? Number(aA) : null;
//             u.grossArea = (gA != "-") ? Number(gA) : null;
//             u.price = (p != "-") ? Number(p) : null;
//             u.actualPrice = (aP != "-") ? Number(aP) : null;
//             u.grossPrice = (gP != "-") ? Number(gP) : null;
//             u.lat = (lat != "nolng") ? Number(lat) : null;
//             u.lng = (lat != "nolng") ? Number(lng) : null;
//         })
//         console.log(arr)
//         await knex("testntw").insert(arr)
//     }
//     console.log("success")
    
// })();

(async function (){
    let data = await knex.select("address").from("testntw").orderBy("date").where("lat","<", "1");
    console.log(data.length)
    console.log(data)
})();
