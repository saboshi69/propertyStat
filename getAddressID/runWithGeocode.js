const rp = require("request-promise")
const util = require('util');
const fs = require("fs")
const readFile = util.promisify(fs.readFile);

async function get1LatLng(location) {
    let url = {
        uri: 'https://maps.googleapis.com/maps/api/geocode/json',
        qs: {
            address: location,
            key: 'AIzaSyBOnmwfxhlcxroJ0DiC9Q0fOY_Q6kAF43g'
        }
    }
    let body = await rp(url)
    let jBody = JSON.parse(body)
    if (jBody.status == "ZERO_RESULTS" || (jBody.results[0].geometry.location["lat"] == "22.396428" && jBody.results[0].geometry.location["lng"] == "114.109497")) {
        console.log("cant target location, your address is garbage!")
        return ["noLat", "noLng"]
    } else {
        let lat = '' + jBody.results[0].geometry.location["lat"]
        let lng = '' + jBody.results[0].geometry.location["lng"]
        console.log([lat, lng])
        return [lat, lng]
    }

}

async function getAddJson(fileName) {
    return await readFile(`./data/${fileName}.json`, "utf8")
}

async function cleanAddJson(data) {
    return data.replace(/[^a-zA-Z0-9.!@?#"$%&:';()*\+,\/;\-=[\\\]\^_{|}<>~` ]+/gmi, ' ')
}

async function editAddJson(data) {
    let adds = await JSON.parse(data);
    let count = await adds.length
    for (let i = 0; i < count; i++) {
        if (adds[i].lat == "noLat" || adds[i].lat == "22.396428" && adds[i].lng == "114.109497" || adds[i].lat == "22.29406" && adds[i].lng == "114.2721") {
            let location = await Object.values(adds[i]["address"]).filter((el) => el != "").slice(-2)
            location.push("HONG KONG")
            location = location.join(" ")
            console.log("Finding address: " + location)
            let latlng = await get1LatLng(location)
            if (latlng[0] == "noLat" && latlng[1] == "noLng") {
                console.log("Shorten address name... starting second trail...")
                let location2 = await Object.values(adds[i]["address"]).filter((el) => el != "").slice(-1)
                location2.push("HONG KONG")
                location2 = location2.join(" ")
                console.log("2nd Attempt: Finding address: " + location2)
                let latlng2 = await get1LatLng(location2)
                adds[i]["lat"] = await String(latlng2[0])
                adds[i]["lng"] = await String(latlng2[1])


            } else {
                console.log("Oh we find the LngLat!")
                adds[i]["lat"] = await String(latlng[0])
                adds[i]["lng"] = await String(latlng[1])
            }
        }
    }
  
    return await adds
}

async function writeAddJson(data, fileName) {
    await fs.writeFile(`./data/${fileName}.json`, JSON.stringify(data), (err) => (err) ? console.log("oops..!" + err) : console.log("writeFile success"))
}


function cool(fileName) {
    console.log("hoho this is the second layer get Lng Lat ")
    console.log("if it still has no result, means the address is pure garbage :(")
    getAddJson(fileName)
        .then((data) => cleanAddJson(data))
        .then((data) => editAddJson(data))
        .then((data) => writeAddJson(data, fileName))
}


cool("KLN2018_209")
