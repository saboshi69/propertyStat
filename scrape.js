const puppeteer = require('puppeteer');


let result = []
let year
let month
let usage
let district
let url = 'http://www.property.hk/eng/tran.php?bldg=&prop=&size=&year=2018&month=1&select=&page=5&dt=HA&tab=TRAN'
let noDataUrl = 'http://www.property.hk/eng/tran.php?bldg=&prop=&size=&year=2018&month=1&select=&page=6&dt=HA&tab=TRAN'



// only scrape one targeted url
async function singlePageScrape(url) {    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const data = await page.evaluate(() => {
        r = []
        for (let i = 2; i < 20; i++) {
            const tds = Array.from(document.querySelectorAll(`#proplist>div>form>table>tbody>tr:nth-child(${i})>td:nth-child(n+2):nth-last-child(1n+3)`))
            let arrTds = tds.map(td => td.innerHTML.replace(/\&nbsp;/g, ' '))
            if (arrTds[0] != undefined) {
                r.push(arrTds)
            }
        }
        return r
    });
    result = [...result,...data]
    await browser.close();
}


// identify if the url is a blank page i.e: no data 
async function isLastPage(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const bool = await page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll(`#proplist>div>form>table>tbody>tr:nth-child(1)>td`))
        let arrTds = tds.map(td => td.innerHTML)
        console.log(arrTds)
        return (arrTds[0] == "No Data...") ? true : false
    })

    await browser.close();
    return bool
}

//scrape all the search result of all pages
/*property Usuage
'r' = residential
'c' = commericial
'o'= office
'i' = industrial
'p' = car park
'' = all
*/
async function scrapeAllsearch(usuage, year, month) {
    console.log(`Start grabing search result`)      
    for (let page = 1, isLast = false; isLast == false; page++) {
        let url = `http://www.property.hk/eng/tran.php?bldg=&prop=${usuage}&size=&year=${year}&month=${month}&select=&page=${page}&dt=HA&tab=TRAN`
        await isLastPage(url)
            .then(async (bool) => {
                if (bool == true) {
                    isLast = true
                    return console.log("Finish scraping")
                } else {
                    isLast = false
                    console.log(`Waiting to scrape page ${page}...`)
                    await singlePageScrape(url)
                }
            })
    }
}


//





 scrapeAllsearch('',2018,1)
 .then(()=>console.log(result))

//  isLastPage(noDataUrl)
//      .then((boolean) => console.log(boolean))


//   singlePageScrape(url)
//      .then(() => console.log(result))