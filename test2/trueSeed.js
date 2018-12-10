const fs = require("nano-fs")


const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "test2",
        user: "test2",
        password: "test2"
    }
});

(async function exp() {
    let arr = [];
    // please dont change the fking path, this path work
    let dir = await fs.readdir(`__dirname/../../getAddressID/data`)
    //let dir = await fs.readdir(`__dirname/../../getAddressID/data`)
//     let ntwArr = dir.filter((u) => u.includes("NTW") || u.includes("KLN"))
//     console.log(ntwArr)

    //optional: if u just append then dun add this
    await knex('alladdress').del();

     for (let element of dir) {
         arr.length = 0;
         // please dont change the fking path, this path work
        let data = await fs.readFile(`__dirname/../../getAddressID/data/${element}`, "utf8")
        //let data = await fs.readFile(`__dirname/../../getAddressID/data/${element}`, "utf8")
        //let data = await fs.readFile(`/mnt/c/Users/Matthew/Documents/Github/matthewlee/2ndProj/pullSamuel/getAddressID/data/KLN2018_209.json`, "utf8")
        let parsed = JSON.parse(data);
        console.log(parsed.length);

        for (let i = 0; i < parsed.length; i++) {
            await arr.push(parsed[i])
        }

        await arr.map((u) => {
            let age = u.age;
            let date = u.date;
            let aA = u.actualArea;
            let gA = u.grossArea;
            let p = u.price;
            let aP = u.actualPrice;
            let gP = u.grossPrice;
            let lat = u.lat;
            let lng = u.lng;
            u.age = (age != "-") ? Number(age) : null;
            u.date = `20${date.slice(6)}-${date.slice(3, 5)}-${date.slice(0, 2)}`
            u.actualArea = (aA != "-") ? Number(aA) : null;
            u.grossArea = (gA != "-") ? Number(gA) : null;
            u.price = (p != "-") ? Number(p) : null;
            u.actualPrice = (aP != "-") ? Number(aP) : null;
            u.grossPrice = (gP != "-") ? Number(gP) : null;
            u.lat = (lat != "noLat") ? String(lat) : null;
            u.lng = (lat != "noLng") ? String(lng) : null;
        })
        console.log(arr)

        //type yout table name here
        await knex("alladdress").insert(arr)
    }
    console.log("success")
    
})();

// (async function (){
//     //let HK = await knex.select("price").from("alladdress").orderBy("price").where("bRegion", "HK")
//     // let HKarr = HK.map(u=>Object.values(u)[0])
//     // console.log (HKarr)
//     // let NTW = await knex.select("price").from("alladdress").orderBy("price").where("bRegion", "NTW")
//     // let NTWarr = NTW.map(u=>Object.values(u)[0])
//     // console.log (NTWarr)
//     // let newData = data.filter((u)=>{
        
//     // })
//     // await fs.writeFile("stat.json", JSON.stringify(newData))
//     let data = await knex.select("lat", "lng").from("alladdress").where("sRegion", "Tuen Mun")
//     console.log (data)
// })();
