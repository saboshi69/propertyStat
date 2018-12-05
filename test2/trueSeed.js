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
<<<<<<< HEAD
    let dir = await fs.readdir(`/Users/chian/Desktop/accel/chianlee/propertyStat/getAddressID/data`)
=======
    //change it plzzzzzzzzzzzzzzzzzz
    let dir = await fs.readdir(`__dirname/../../getAddressID/data`)
>>>>>>> 4e7c550608d5fb7fd3461b49649b8fd5f0975853
//     let ntwArr = dir.filter((u) => u.includes("NTW") || u.includes("KLN"))
//     console.log(ntwArr)

    //optional: if u just append then dun add this
    await knex('alladdress').del();

     for (let element of dir) {
<<<<<<< HEAD
         arr.length = 0;
        let data = await fs.readFile(`/Users/chian/Desktop/accel/chianlee/propertyStat/getAddressID/data/${element}`, "utf8")
        //let data = await fs.readFile(`/mnt/c/Users/Matthew/Documents/Github/matthewlee/2ndProj/pullSamuel/getAddressID/data/KLN2018_209.json`, "utf8")
=======
        arr.length = 0;
         //change it plzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
        let data = await fs.readFile(`__dirname/../../getAddressID/data/${element}`, "utf8")
        //let data = await fs.readFile(`/mnt/c/Users/Matthew/Documents/Github/matthewlee/2ndProj/pullSamuel/getAddressID/temp209.json`, "utf8")
>>>>>>> 4e7c550608d5fb7fd3461b49649b8fd5f0975853
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
            u.lat = (lat != "nolng") ? Number(lat) : null;
            u.lng = (lat != "nolng") ? Number(lng) : null;
        })
        console.log(arr)

        //type yout table name here
        await knex("alladdress").insert(arr)
    }
    console.log("success")
    
})();