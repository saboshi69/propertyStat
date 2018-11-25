// const cheerio = require("cheerio");
// const rp = require("request-promise");

// async function cheer (){
//     let html = rp('http://www.property.hk/eng/tran.php?bldg=&prop=&size=&year=2018&month=1&select=&page=5&dt=HA&tab=TRAN')
//     let $ = await cheerio.load(html);
//     let arr = await $(`#proplist>div>form>table>tbody>tr>td`).map((i, elm)=>{
//         return $(this).children().text()
//     })
//     return arr
// }

// cheer().then((data)=>{console.log (data)})

const rp = require('request-promise');
const fs = require("fs")
const cheerio = require("cheerio")

let isLast = false

const key = {
    "0": "Date",
    "1": "Address",
    "2": "Floor",
    "3": "Unit",
    "4": "Area(ft sq)",
    "5": "Price(M)",
    "6": "Price(ft)"
}


const arr = [];

const regions = [ 'HA',
  'HC',
  'HCB',
  'HCW',
  'HHV',
  'HKT',
  'HM',
  'HMC',
  'HME',
  'HMW',
  'HNH',
  'HNP',
  'HP',
  'HPF',
  'HQB',
  'HRB',
  'HSK',
  'HSL',
  'HSS',
  'HSW',
  'HSY',
  'HTT',
  'HWC',
  'HWH',
  'KCS',
  'KDH',
  'KHH',
  'KHM',
  'KKB',
  'KKC',
  'KKL',
  'KKT',
  'KLC',
  'KLT',
  'KMK',
  'KNC',
  'KNT',
  'KSK',
  'KSP',
  'KSS',
  'KTK',
  'KTS',
  'KTW',
  'KWH',
  'KWT',
  'KYM',
  'KYT',
  'NDB',
  'NFL',
  'NIS',
  'NKC',
  'NMO',
  'NMW',
  'NSK',
  'NSS',
  'NST',
  'NTC',
  'NTK',
  'NTM',
  'NTP',
  'NTS',
  'NTW',
  'NTY',
  'NYL' ]

async function happy (url){
    let html = await rp(url);
    const $ = cheerio.load(html);
    const tr = $("#proplist div form table tbody tr")
    const end = $(`#proplist div form table tbody tr td`).text()
    if (end.includes("Data")) isLast = true;
    //loop for each tr
    await tr.each(async (i, elem)=>{
        //loop for each td
        await $(elem).find(".hidden-xs").each(async (i, element)=>{
            let x = await $(element).text();
            if (x.length > 0 && x.includes("Detail")==false && x.includes("Asking")==false) {
                await console.log (`${key[String(i)]}:${x}`)
                await arr.push(`${key[String(i)]}:${x}`)
            }
        })
    })
    // await fs.createWriteStream(`${__dirname}/test.json`).write(JSON.stringify(arr))
    // await fs.appendFile("test.json", JSON.stringify(arr), async (err)=>{
    //     if (err) console.log (err);
    //     console.log ("write file success");
    //     arr.length = 0;
    // })
    let data = await [...arr]
    return data
}

async function grabAll (usuage, year, month){
    for (let region of regions){
        isLast = false;
        for (let page = 1; isLast == false; page++){
            arr.length = 0;
            let url = `http://www.property.hk/eng/tran.php?bldg=&prop=${usuage}&size=&year=${year}&month=${month}&select=&page=${page}&dt=${region}&tab=TRAN`
            let data = await happy(url)
            await fs.createWriteStream(`${__dirname}/test.json`).write(JSON.stringify(data))
        }
    }
}

grabAll('', 2018, 11);