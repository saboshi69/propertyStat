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

function filterRegion(arr, u) {
    let x = false;
    for (let element of arr) {
        if (u.sRegion == element) {
            x = true
        }
    }
    return x
}

function filterTime(duration, u) {
    let today = new Date();
    let diff = today - u.date
    let rightDiff = 1000 * 60 * 60 * 24 * duration;
    if (duration != 12) {
        if (rightDiff >= diff) {
            return true
        } else {
            return false
        }
    } else {
        return true
    }
}

let dummy = {
    sRegion: ['Ma Wan/Park Island'],
    actualArea: [],
    price: ['3-6'],
    actualPrice: [],
    date: ['365'],
    latlng: ['22.350075,114.059207']
}

//dbData(dummy).then((data) => { console.log(data) })
<<<<<<< HEAD
//fdsfadsfsdafadfasdfdsafdsafasdf
=======
>>>>>>> master

async function dbData(json) {
    let jsonArr = await _.toPairs(json).filter((u) => { return u[1][0] != undefined })
    let result = await knex.select("sRegion", "address", "actualArea", "price", "actualPrice", "date", "lat", "lng").from("alladdress")
    for (let col of jsonArr) {
        if (col[0] == "sRegion") {
            result = await result.filter((u) => {
                return filterRegion(col[1], u)
            })
        } else {
            if (col[1][0].includes("<")) {
                result = await result.filter((u) => {
                    return u[`${col[0]}`] < Number(col[1][0].slice(1))
                })
            } else if (col[1][0].includes(">")) {
                result = await result.filter((u) => {
                    return u[`${col[0]}`] > Number(col[1][0].slice(1))
                })
            } else if (col[1][0].includes("-")) {
                let arr = col[1][0].split("-");
                result = await result.filter((u) => {
                    return u[`${col[0]}`] > Number(arr[0]) && u[`${col[0]}`] < Number(arr[1])
                })
            } else if (!col[1][0].includes(",")) {
                let duration = parseFloat(col[1][0])
                result = await result.filter((u) => {
                    return filterTime(duration, u)
                })
            }

            //from original dbGeocode.js
            else if (col[1][0].includes(",")) {
                let latlng = col[1][0].split(",")
                let clat = latlng[0];
                let clng = latlng[1];
                result = await result
                    .filter((u) => {
                        let lat = parseFloat(u.lat);
                        let lng = parseFloat(u.lng);
                        let distance = measure(lat, lng, clat, clng)
                        return distance < 1500
                    })
                    .map((u) => {
                        let address = Object.values(u.address).filter((a) => { return a.length > 0 }).join()
                        return {
                            sRegion: u.sRegion,
                            address: address,
                            actualArea: u.actualArea,
                            actualPrice: u.actualPrice,
                            price: u.price,
                            date: u.date,
                            lat: u.lat,
                            lng: u.lng
                        }
                    })
            }
        }
    }
    return result
}

function measure(lat1, lng1, lat2, lng2) {  // generally used geo measurement function
    let R = 6378.137; // Radius of earth in KM
    let dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    let dLng = lng2 * Math.PI / 180 - lng1 * Math.PI / 180;
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d * 1000; // meters
}


module.exports = dbData;

