const cheerio = require("cheerio");
const request = require("request");
const rp = require("request-promise");
const fs = require("fs")
const key = require("./addressKey.js")
const _ = require("lodash")

let isLast;

let testUrl = "http://www.ricacorp.com/ricadata/eptest.aspx?type=22&code=102&info=tr&code2=rdoreg:0~regidx:6~regdatemin:01/01/2018~regdatemax:31/12/2018~regperiod:2018~insdatemin:~insdatemax:~insperiod:730~upricemin:~upricemax:~considermin:~considermax:~areamin:~areamax:~bldgagemin:~bldgagemax:~lord:namec~lordtype:desc~tabIdx:0~mkttype:0~rdogainper:0~gainperidx:0~gainpermin:~gainpermindir:0~gainpermax:~gainpermaxdir:0~rdoltins:0~ltinsidx:0~ltinsdatemin:01/01/1900~ltinsdatemax:25/11/2018~ltinsperiod:1900&page=180#txtab"

async function singlePage(url, bRegion, sRegion) {
    //standBy value if add5 is 0
    let standBy = _.findKey(key[`${bRegion}`], function(v) { return v === `${sRegion}`; })

    let html = await rp(url);
    const $ = cheerio.load(html);

    //get the full table
    const trCount = $(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"])`).length

    if (trCount == 0){
        isLast = true
    } 

    const add1 = $('#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr >td > u:nth-child(1)').map((i, elem) => { return $(elem).text() })
    const add2 = $('#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr >td > u:nth-child(2)').map((i, elem) => { return $(elem).text() })
    const add3 = $('#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr >td > u:nth-child(3)').map((i, elem) => { return $(elem).text() })
    const add4 = $('#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr >td > u:nth-child(4)').map((i, elem) => { return $(elem).text() })
    const add5 = $('#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr >td > u:nth-child(5)').map((i, elem) => { return $(elem).text() })
    const age = $(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr > td.tdtr1age`).map((i, elem) => { return $(elem).text() })
    const date = $(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr > td.tdtr1reg`).map((i, elem) => { return $(elem).text() })
    const actualArea = $(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr > td:nth-child(5)`).map((i, elem) => { return $(elem).text() })
    const grossArea = $(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr > td:nth-child(6)`).map((i, elem) => { return $(elem).text() })
    const price = $(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr > td.tdtr1con`).map((i, elem) => { return $(elem).text() })
    const actualPrice = $(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr > td.tdtr1uprice`).map((i, elem) => { return $(elem).text() })
    const grossPrice = $(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr > td.tdtr1Guprice`).map((i, elem) => { return $(elem).text() })

    for (let i = 0; i < trCount; i++) {
        let json = {
            "address": {
                "add1": `${add1[i]}`,
                "add2": `${add2[i]}`,
                "add3": `${add3[i]}`,
                "add4": `${add4[i]}`,
                "add5": `${(add5[i].length != 0)?add5[i]:standBy}`
            },
            "age": `${age[i]}`.trim(),
            "date": `${date[i]}`,
            "actualArea": `${actualArea[i]}`.trim(),
            "grossArea": `${grossArea[i]}`.trim(),
            "price": `${price[i]}`,
            "actualPrice": `${actualPrice[i]}`.trim(),
            "grossPrice": `${grossPrice[i]}`.trim(),
            "latlng": ""
        }
        let number = await getLatLng(json);
        json["latlng"] = String(number);
        await fs.appendFile("NTE2018.json", JSON.stringify(json) + ',', err=>(err)?console.log (err):console.log ("writeFile success"))
    }
}

async function getLatLng(address) {
    let data = Object.values(address["address"])
        for (let k = 4; 0 <= k; k--) {
            if (data[k] != "") {

                let myrequest = data[k].replace(/,/g, '').replace(/[()]/g, '').replace(/[-]/g, ' ').split(" ").join("+")
                let url = `https://gbcode.ofca.gov.hk/TuniS/app1.ofca.gov.hk/apps/ubs/data/text.asp?street=&streetNo=&freeText=${myrequest}&infra=A&page=1`


                
                let body = await rp(url)
                let latlng = JSON.parse(body)
                    if (latlng[0].total == 0) {
                        return "noLat, noLng"
                        //console.log("cannot target latitude and longitude for row: " + i)
                    } else if (latlng[0].total == 1) {
                        let lat = '' + latlng[1].lat
                        let lng = '' + latlng[1].lng

                        
                        //console.log("targeted latitude and longitude for row: " + i)
                        console.log("lat: " + lat + "lng: " + lng)
                        return `${lat}, ${lng}`
                    } else {
                        let lat
                        let lng
                        let point = 0
                        //console.log("mulitple latitude and longitude detected for row: " + i)
                        for (let v = 1; v < latlng.length; v++) {
                            let a = latlng[v].addrEng
                            let b = [data[0], data[1], data[2], data[3], data[4]]
                            a = a.toUpperCase().replace(/,/g, '').split(" ")
                            b = b.map((e) => e.toUpperCase().replace(/,/g, '').replace(/[()]/g, '').replace(/[-]/g, ' ')).join(" ").split(" ").join(" ").trim().split(" ")
                            let p = matchAddress(a, b)
                            if (p > point) {
                                point = p
                                lat = '' + latlng[v].lat
                                lng = '' + latlng[v].lng
                            }
                        }
                        
                        //console.log("targeted latitude and longitude for row: " + i)
                        console.log("lat: " + lat + "lng: " + lng)
                        return `${lat}, ${lng}`  
                    }        
            }
            k = -1
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

async function grabAll(bRegion, year, today){
    const regions = Object.values(key[`${bRegion}`])
    for (let sRegion of regions){
        isLast = false;
        for (let page = 0; isLast == false; page++){
            let url = `http://www.ricacorp.com/ricadata/eptest.aspx?type=22&code=${sRegion}&info=tr&code2=rdoreg:0~regidx:6~regdatemin:01/01/${year}~regdatemax:31/12/${year}~regperiod:2018~insdatemin:~insdatemax:~insperiod:730~upricemin:~upricemax:~considermin:~considermax:~areamin:~areamax:~bldgagemin:~bldgagemax:~lord:namec~lordtype:desc~tabIdx:0~mkttype:0~rdogainper:0~gainperidx:0~gainpermin:~gainpermindir:0~gainpermax:~gainpermaxdir:0~rdoltins:0~ltinsidx:0~ltinsdatemin:01/01/1900~ltinsdatemax:${today}~ltinsperiod:1900&page=${page*30}#txtab`
            await singlePage(url, bRegion, sRegion)
        } 
    }
}

grabAll("NTE", 2018, "27/11/2018")
.catch(err=>console.log(err))