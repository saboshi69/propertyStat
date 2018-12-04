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




let dummy = ["postionA", 22.333147, 114.193441]


function measure(lat1, lng1, lat2, lng2) {  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLng = lng2 * Math.PI / 180 - lng1 * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d * 1000; // meters
}


async function dbGeocode(code) {
    let clat = code[1];
    let clng = code[2];
    let result = await knex.select("sRegion", "address", "actualArea", "actualPrice", "lat", "lng").from("alladdress")
    let x = result
        .filter((u) => {
            let lat = Number(u.lat);
            let lng = Number(u.lng);
            let distance = measure(lat, lng, clat, clng)
            return distance < 500
        })
        .map((u)=>{
            let address = Object.values(u.address).filter((a)=>{return a.length > 0}).join()
            return {
                sRegion: u.sRegion,
                address: address,
                actualArea: u.actualArea,
                actualPrice: u.actualPrice,
                lat: u.lat,
                lng: u.lng
            }
        })
    return x
}

dbGeocode(dummy)
    .then((data) => {
        console.log(data);
        fs.writeFile("test.json", JSON.stringify(data))
    })

module.exports = dbGeocode