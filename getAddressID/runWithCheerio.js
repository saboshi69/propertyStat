const cheerio = require("cheerio");
const request = require("request");
const rp = require("request-promise");
const fs = require("fs")
const key = require("./addressKey.js")
const _ = require("lodash")

let isLast;

async function singlePage(url, bRegion, sRegion) {
    //standBy value if add5 is 0
    let sRegName = _.findKey(key[`${bRegion}`], function (v) {
        return v === `${sRegion}`;
    })

    let html = await rp(url);
    const $ = cheerio.load(html);

    //get the full table
    const trCount = $(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"])`).length

    if (trCount == 0) {
        isLast = true
    }

    const add1 = $('#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr >td > u:nth-child(1)').map((i, elem) => {
        return $(elem).text()
    })
    const add2 = $('#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr >td > u:nth-child(2)').map((i, elem) => {
        return $(elem).text()
    })
    const add3 = $('#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr >td > u:nth-child(3)').map((i, elem) => {
        return $(elem).text()
    })
    const add4 = $('#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr >td > u:nth-child(4)').map((i, elem) => {
        return $(elem).text()
    })
    const add5 = $('#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr >td > u:nth-child(5)').map((i, elem) => {
        return $(elem).text()
    })
    const age = $(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr > td.tdtr1age`).map((i, elem) => {
        return $(elem).text()
    })
    const date = $(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr > td.tdtr1reg`).map((i, elem) => {
        return $(elem).text()
    })
    const actualArea = $(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr > td:nth-child(5)`).map((i, elem) => {
        return $(elem).text()
    })
    const grossArea = $(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr > td:nth-child(6)`).map((i, elem) => {
        return $(elem).text()
    })
    const price = $(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr > td.tdtr1con`).map((i, elem) => {
        return $(elem).text()
    })
    const actualPrice = $(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr > td.tdtr1uprice`).map((i, elem) => {
        return $(elem).text()
    })
    const grossPrice = $(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr > td.tdtr1Guprice`).map((i, elem) => {
        return $(elem).text()
    })

    for (let i = 0; i < trCount; i++) {
        let json = {
            "address": {
                "add1": `${add1[i]}`.trim().toUpperCase(),
                "add2": `${add2[i]}`.trim().toUpperCase(),
                "add3": `${add3[i]}`.trim().toUpperCase(),
                "add4": `${add4[i]}`.trim().toUpperCase(),
                "add5": `${add5[i]}`.trim().toUpperCase()
            },
            "tempEstateSearchKey": "",
            "tempStreetSearchKey": "",
            "sRegion": sRegName,
            "bRegion": bRegion,
            "age": `${age[i]}`.trim(),
            "date": `${date[i]}`,
            "actualArea": `${actualArea[i]}`.trim(),
            "grossArea": `${grossArea[i]}`.trim(),
            "price": `${price[i]}`.replace('M', '').replace('$', ''),
            "actualPrice": `${actualPrice[i]}`.trim(),
            "grossPrice": `${grossPrice[i]}`.trim(),
            "lat": "",
            "lng": ""
        }
        let street = Object.values(json["address"]).filter((el) => el.split(" ").includes('STREET') == true).slice(-1)[0]
        let village = Object.values(json["address"]).filter((el) => el.split(" ").includes('VILLAGE') == true).slice(-1)[0]
        let road = Object.values(json["address"]).filter((el) => el.split(" ").includes('ROAD') == true).slice(-1)[0]
        let estate = Object.values(json["address"]).filter((el) => el != "").slice(-1)[0].replace(/,/g, '').replace(/ *\([^)]*\) */g, '').replace(/[-]/g, ' ').split(" ").join("+")
        if (village != undefined) {
            json["tempStreetSearchKey"] = village.split(" VILLAGE")[0].split(" ").join("+")
        } else if (road != undefined) {
            json["tempStreetSearchKey"] = road.split(" ROAD")[0].replace('NO.', '').replace(/[0-9]/g, '').trim().split(" ").join("+")
        } else if (street != undefined) {
            json["tempStreetSearchKey"] = street.split(" STREET")[0].replace('NO.', '').replace(/[0-9]/g, '').trim().split(" ").join("+")
        }

        json["tempEstateSearchKey"] = estate

        let number = await getLatLng(json);
        json["lat"] = String(number[0]);
        json["lng"] = String(number[1]);
        delete json["tempStreetSearchKey"]
        delete json["tempEstateSearchKey"]
        await fs.appendFile(`NTE2018.json`, JSON.stringify(json) + ',', err => (err) ? console.log(err) : console.log("writeFile success"))
    }
}

async function getLatLng(address) {
    let data = Object.values(address["address"])
    let myrequest = address["tempEstateSearchKey"]
    let myrequest2 = address["tempStreetSearchKey"]
    if (myrequest2 == "") {
        myrequest2 = address["tempEstateSearchKey"].replace('NO.', '').replace(/[0-9]/g, '').trim()
    }
    let url = `https://gbcode.ofca.gov.hk/TuniS/app1.ofca.gov.hk/apps/ubs/data/text.asp?street=&streetNo=&freeText=${myrequest}&infra=A&page=1`
    let url2 = `https://gbcode.ofca.gov.hk/TuniS/app1.ofca.gov.hk/apps/ubs/data/text.asp?street=${myrequest2}&streetNo=&freeText=&infra=A&page=1`

    let body = await rp(url)
    let body2 = await rp(url2)
    let latlng = await JSON.parse(body)
    let latlng2 = await JSON.parse(body2)

    if (latlng[0].total == 0 && latlng2[0].total == 0) {
        return ["noLat", "noLng"]
    } else if (latlng[0].total == 1) {
        let lat = '' + latlng[1].lat
        let lng = '' + latlng[1].lng
        console.log("lat: " + lat + " lng: " + lng)
        return [`${lat}`, `${lng}`]
    } else if (latlng[0].total > 1) {
        let lat
        let lng
        let point = 0
        for (let v = 1; v < latlng.length; v++) {
            let a = latlng[v].addrEng
            let b = [data[0], data[1], data[2], data[3], data[4]]
            a = a.toUpperCase().replace(/,/g, '').split(" ")
            b = b.map((e) => e.replace(/,/g, '').replace(/[()]/g, '').replace(/[-]/g, ' ')).join(" ").split(" ").join(" ").trim().split(" ")
            let p = matchAddress(a, b)
            if (p > point) {
                point = p
                lat = '' + latlng[v].lat
                lng = '' + latlng[v].lng
            }
        }
        console.log("lat: " + lat + " lng: " + lng)
        return [`${lat}`, `${lng}`]
    } else if (latlng2[0].total == 1) {
        let lat = '' + latlng2[1].lat
        let lng = '' + latlng2[1].lng
        console.log("lat: " + lat + " lng: " + lng)
        return [`${lat}`, `${lng}`]
    } else {
        let lat
        let lng
        let point = 0
        for (let v = 1; v < latlng2.length; v++) {
            let a = latlng2[v].addrEng
            let b = [data[0], data[1], data[2], data[3], data[4]]
            a = a.toUpperCase().replace(/,/g, '').split(" ")
            b = b.map((e) => e.replace(/,/g, '').replace(/[()]/g, '').replace(/[-]/g, ' ')).join(" ").split(" ").join(" ").trim().split(" ")
            let p = matchAddress(a, b)
            if (p > point) {
                point = p
                lat = '' + latlng2[v].lat
                lng = '' + latlng2[v].lng
            }
        }
        console.log("lat: " + lat + " lng: " + lng)
        return [`${lat}`, `${lng}`]
    }

}


function matchAddress(a, b) {
    let p = 0
    for (let i = 0; i < a.length; i++) {
        for (let c = 0; c < b.length; c++) {
            if (a[i] == b[c]) {
                p++
            }
        }
    }
    return p
}

async function grabAll(bRegion, year, today) {
    const regions = Object.values(key[`${bRegion}`])
    for (let sRegion of regions) {
        isLast = false;
        for (let page = 0; isLast == false; page++) {
            let url = `http://www.ricacorp.com/ricadata/eptest.aspx?type=22&code=${sRegion}&info=tr&code2=rdoreg:0~regidx:6~regdatemin:01/01/${year}~regdatemax:31/12/${year}~regperiod:2018~insdatemin:~insdatemax:~insperiod:730~upricemin:~upricemax:~considermin:~considermax:~areamin:~areamax:~bldgagemin:~bldgagemax:~lord:namec~lordtype:desc~tabIdx:0~mkttype:0~rdogainper:0~gainperidx:0~gainpermin:~gainpermindir:0~gainpermax:~gainpermaxdir:0~rdoltins:0~ltinsidx:0~ltinsdatemin:01/01/1900~ltinsdatemax:${today}~ltinsperiod:1900&page=${page*40}#txtab`
            await singlePage(url, bRegion, sRegion)
        }
    }
}

grabAll("NTE", 2018, "27/11/2018")
    .catch(err => console.log(err))