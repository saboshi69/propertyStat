const rp = require('request-promise')
async function dBgetLatLng(location) {
    let url = {
        uri: 'https://maps.googleapis.com/maps/api/geocode/json',
        qs: {
            address: location,
            key: 'AIzaSyBQz4uq_a_mNQQrHpWtKIRDSi02mUME-s8'
        }
    }
    let body = await rp(url)
    //console.log(url)
    let jBody = JSON.parse(body)
    if (jBody.status == "ZERO_RESULTS" || (jBody.results[0].geometry.location["lat"] == "22.396428" && jBody.results[0].geometry.location["lng"] == "114.109497")) {
        console.log("cant target location, your address is garbage!")
        return ["noLat", "noLng"]
    } else {
        let lat = '' + jBody.results[0].geometry.location["lat"]
        let lng = '' + jBody.results[0].geometry.location["lng"]
       // console.log([lat, lng])
        return [lat, lng]
    }

}

module.exports = dBgetLatLng