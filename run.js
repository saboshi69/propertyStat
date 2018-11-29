const puppeteer = require('puppeteer');
const request = require('request');
const rp = require('request-promise');


async function singlePageScrape(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const data = await page.evaluate(() => {
        const trs = Array.from(document.querySelectorAll(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"])`))
        const trCount = trs.length
        const add1 = Array.from(document.querySelectorAll('#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr >td > u:nth-child(1)')).map(el => el.innerHTML)
        const add2 = Array.from(document.querySelectorAll('#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr >td > u:nth-child(2)')).map(el => el.innerHTML)
        const add3 = Array.from(document.querySelectorAll('#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr >td > u:nth-child(3)')).map(el => el.innerHTML)
        const add4 = Array.from(document.querySelectorAll('#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr >td > u:nth-child(4)')).map(el => el.innerHTML)
        const add5 = Array.from(document.querySelectorAll('#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr >td > u:nth-child(5)')).map(el => el.innerHTML)
        const age = Array.from(document.querySelectorAll(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr > td.tdtr1age`)).map(el => el.innerHTML)
        const date = Array.from(document.querySelectorAll(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr > td.tdtr1reg`)).map(el => el.innerHTML)
        const actualArea = Array.from(document.querySelectorAll(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr > td:nth-child(5)`)).map(el => el.innerHTML)
        const grossArea = Array.from(document.querySelectorAll(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr > td:nth-child(6)`)).map(el => el.innerHTML)
        const price = Array.from(document.querySelectorAll(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr > td.tdtr1con`)).map(el => el.innerHTML)
        const actualPrice = Array.from(document.querySelectorAll(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr > td.tdtr1uprice`)).map(el => el.innerHTML)
        const grossPrice = Array.from(document.querySelectorAll(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"]) > td > table > tbody > tr > td.tdtr1Guprice`)).map(el => el.innerHTML)

        let result = []
        for (let i = 0; i < trCount; i++) {
            result[i] = [add1[i], add2[i], add3[i], add4[i], add5[i], age[i], date[i], actualArea[i], grossArea[i], price[i], actualPrice[i], grossPrice[i]]
        }
        return result
    });
    await browser.close();
    return data
}


async function isLastPage(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const bool = await page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll(`#ctmod1tab_mptran > tbody > tr > td > table > tbody > tr:not([height="1"]):not([bgcolor="#cccccc"])`))
        if (tds.length == 0) {
            return true
        } else {
            return false
        }
    });
    await browser.close();
    return bool
}

async function getLatLng(myData) {
    let data = myData.slice()
    let rows = data.length
    for (let i = 0; i < rows; i++) {
        for (let k = 4; 0 <= k; k--) {
            if (data[i][k] != "") {

                let myrequest = data[i][k].replace(/,/g, '').replace(/[()]/g, '').replace(/[-]/g, ' ').split(" ").join("+");

                let url = `https://gbcode.ofca.gov.hk/TuniS/app1.ofca.gov.hk/apps/ubs/data/text.asp?street=&streetNo=&freeText=${myrequest}&infra=A&page=1`

                await request(url, await function (error, response, body) {
                    let latlng = JSON.parse(body)
                    // console.log(latlng[10].addrEng)
                    if (latlng[0].total == 0) {
                        // console.log(latlng);
                        data[i] = [...data[i], "noLat", "noLng"]
                        // console.log("cannot target latitude and longitude for row: " + i)
                    } else if (latlng[0].total == 1) {
                        let lat = '' + latlng[1].lat
                        let lng = '' + latlng[1].lng

                        data[i] = [...data[i], lat, lng]
                        // console.log("targeted latitude and longitude for row: " + i)
                        // console.log("lat: " + lat + "lng: " + lng)
                    } else {
                        let lat
                        let lng
                        let point = 0
                        // console.log("mulitple latitude and longitude detected for row: " + i)
                        for (let v = 1; v < latlng.length; v++) {

                            let a = latlng[v].addrEng
                            let b = [data[i][0], data[i][1], data[i][2], data[i][3], data[i][4]]

                            a = a.toUpperCase().replace(/,/g, '').split(" ")

                            b = b.map((e) => e.toUpperCase().replace(/,/g, '').replace(/[()]/g, '').replace(/[-]/g, ' ')).join(" ").split(" ").join(" ").trim().split(" ")
                        
                            // [ 'MEI',
                            //   'FAI',
                            //   'COURT',
                            //   'SOUTH',
                            //   'HORIZONS',
                            //   'SOUTH',
                            //   'HORIZON',
                            //   'DRIVE',
                            //   'SOUTHERN' ]
                            let p = matchAddress(a, b)
                            if (p > point) {
                                // console.log(p);
                                point = p
                                lat = '' + latlng[v].lat
                                lng = '' + latlng[v].lng
                                // console.log(lat);
                            }
                        }
                        data[i] = [...data[i], lat, lng];
                        // console.log(data[i]);
                        // console.log("targeted latitude and longitude for row: " + i)
                        // console.log("lat: " + lat + "lng: " + lng)
                    }                                    
                });
                
                k = -1
            }
        }
    }
    console.log(data[10]);
    return data
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



let testAddList = [
    ['FLAT B',
        '25/F',
        'MEI WAH COURT (BLOCK 22)',
        'PHASE 3',
        'SOUTH HORIZONS',
        ' 24 ',
        '13/08/18',
        '581s.f. ',
        '745s.f. ',
        '$9.68M',
        ' $16661 ',
        ' $12993 '
    ],
    ['FLAT E',
        '17/F',
        'WAI KING COURT (BLOCK 30)',
        'PHASE 4 THE OASIS',
        'SOUTH HORIZONS',
        ' 24 ',
        '13/08/18',
        '687s.f. ',
        '856s.f. ',
        '$11.95M',
        ' $17394 ',
        ' $13960 '
    ],
    ['FLAT D',
        '12/F',
        'PAK KING COURT (BLOCK 31)',
        'PHASE 4 THE OASIS',
        'SOUTH HORIZONS',
        ' 24 ',
        '10/08/18',
        '527s.f. ',
        '662s.f. ',
        '$8.90M',
        ' $16888 ',
        ' $13444 '
    ],
    ['FLAT E',
        '18/F',
        'WAI KING COURT (BLOCK 30)',
        'PHASE 4 THE OASIS',
        'SOUTH HORIZONS',
        ' 24 ',
        '09/08/18',
        '687s.f. ',
        '856s.f. ',
        '$11.00M',
        ' $16012 ',
        ' $12850 '
    ]
]

let testurl = 'http://www.ricacorp.com/ricadata/eptest.aspx?type=22&code=102&info=tr&code2=rdoreg:0~regidx:6~regdatemin:01/01/2018~regdatemax:31/12/2018~regperiod:2018~insdatemin:~insdatemax:~insperiod:730~upricemin:~upricemax:~considermin:~considermax:~areamin:~areamax:~bldgagemin:~bldgagemax:~lord:namec~lordtype:desc~tabIdx:0~mkttype:0~rdogainper:0~gainperidx:0~gainpermin:~gainpermindir:0~gainpermax:~gainpermaxdir:0~rdoltins:0~ltinsidx:0~ltinsdatemin:01/01/1900~ltinsdatemax:25/11/2018~ltinsperiod:1900&page=0#txtab'

let testnoDataUrl = 'http://www.ricacorp.com/ricadata/eptest.aspx?type=22&code=102&info=tr&code2=rdoreg:0~regidx:6~regdatemin:01/01/2018~regdatemax:31/12/2018~regperiod:2018~insdatemin:~insdatemax:~insperiod:730~upricemin:~upricemax:~considermin:~considermax:~areamin:~areamax:~bldgagemin:~bldgagemax:~lord:namec~lordtype:desc~tabIdx:0~mkttype:0~rdogainper:0~gainperidx:0~gainpermin:~gainpermindir:0~gainpermax:~gainpermaxdir:0~rdoltins:0~ltinsidx:0~ltinsdatemin:01/01/1900~ltinsdatemax:25/11/2018~ltinsperiod:1900&page=220#txtab'

// singlePageScrape(testurl)
// .then((data) => console.log(data))

// isLastPage(testnoDataUrl)
// .then((data)=>console.log(data))



getLatLng(testAddList)
.then((data)=> console.log(data) )
