const puppeteer = require('puppeteer');
const fs = require("fs")
const request = require("request")

async function grabGPS() {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.evaluateOnNewDocument(function () {
        navigator.geolocation.getCurrentPosition = function (cb) {
            setTimeout(() => {
                cb({
                    'coords': {
                        accuracy: 21,
                        altitude: null,
                        altitudeAccuracy: null,
                        heading: null,
                        latitude: 23.129163,
                        longitude: 113.264435,
                        speed: null
                    }
                })
            }, 1000)
        }
    });
    await page.goto("https://www.gps-coordinates.net/", { waitUntil: 'networkidle2', timeout: 60000})
    const data = await page.evaluate(() => {
        document.querySelector("#address").setAttribute("value", "Cheung Tung House, Hong Kong");
    })
    await page.click(".form-group div button");
    await page.hover(".row .col-md-8")
    await setTimeout(()=>{console.log("happy"), 10000})
    await page.waitForSelector("#info_window", { waitUntil: 'networkidle2'});
    const text = await page.evaluate(() => {
        return document.querySelector("#info_window").innerText;
    })
    await browser.close();
    return text
}

grabGPS().then(data => console.log(`data: ${data}`))