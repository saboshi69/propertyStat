
let json = [{ "sRegion": "Tai Po Market/Tai Wo", "actualArea": 1574, "price": 26.98, "actualPrice": 17144, "lat": 22.4498, "lng": 114.168 }, { "sRegion": "Tai Po Market/Tai Wo", "actualArea": 620, "price": 10.9, "actualPrice": 17581, "lat": 22.4435, "lng": 114.17 }, { "sRegion": "Tai Po Market/Tai Wo", "actualArea": 620, "price": 10.9, "actualPrice": 17581, "lat": 22.4436, "lng": 114.169 }, { "sRegion": "Tai Po Market/Tai Wo", "actualArea": 2023, "price": 34.72, "actualPrice": 17165, "lat": 22.4498, "lng": 114.168 }, { "sRegion": "Tai Po Market/Tai Wo", "actualArea": 1555, "price": 27.54, "actualPrice": 17710, "lat": 22.4498, "lng": 114.168 }, { "sRegion": "Belvedere Garden/Castle Peak Road (Tsuen Wan Portion)", "actualArea": 644, "price": 10.7, "actualPrice": 16615, "lat": 22.3723, "lng": 114.103 }, { "sRegion": "Belvedere Garden/Castle Peak Road (Tsuen Wan Portion)", "actualArea": 738, "price": 11.29, "actualPrice": 15298, "lat": 22.3725, "lng": 114.103 }, { "sRegion": "Belvedere Garden/Castle Peak Road (Tsuen Wan Portion)", "actualArea": 2432, "price": 40.8, "actualPrice": 16776, "lat": 22.3689, "lng": 114.094 }, { "sRegion": "Belvedere Garden/Castle Peak Road (Tsuen Wan Portion)", "actualArea": 738, "price": 11.38, "actualPrice": 15420, "lat": 22.3723, "lng": 114.103 }, { "sRegion": "Belvedere Garden/Castle Peak Road (Tsuen Wan Portion)", "actualArea": 2413, "price": 38.8, "actualPrice": 16080, "lat": 22.3689, "lng": 114.094 }]


function histogram(data, sRegion) {
    let parsed = JSON.parse(data)
    let mapped = parsed.slice().map((u) => {
        return [u.sRegion, u.price]
    })
    let allPrice = parsed.slice().filter((u) => { return u != NaN }).map((u) => { return u[1] })
    let maxPrice = Math.max(...allPrice)
    let minPrice = Math.min(...allPrice)
    let chartData = [["sRegion", "price"], ...mapped]
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        let graph = google.visualization.arrayToDataTable(chartData);
        let options = {
            title: `${sRegion} Price distribution 2018`,
            legend: { position: 'none' },
            colors: ['#4285F4'],

            // animation: {
            //     "startup": true,
            //     "duration": 500,
            //     "easing": "out"
            // },

            chartArea: { width: 401 },

            bar: { gap: 0 },

            histogram: {
                bucketSize: 0.01,
                maxNumBuckets: maxPrice / 0.01,
                minValue: minPrice,
                maxValue: maxPrice
            }
        }
        let chart = new google.visualization.Histogram(document.querySelector("#histogram"));
        chart.draw(graph, options)
    }
}

async function candle(data, sRegion, date) {
    //process data
    let day = Number(date[0])
    let parsed = JSON.parse(data)
    let today = new Date();
    let msDay = 1000 * 60 * 60 * 24;
    let realData = [];
    let wholeYear = Number(Math.floor((today - new Date(2018, 0, 1))/msDay))
    
    let factor = (day!=365)?(day * msDay / 15):(wholeYear*msDay/15)
    for (let i = 15; i > 0; i--) {
        let maxDiff = i * factor;
        let minDiff = (i - 1) * factor
        let maxDate = new Date(today - maxDiff)
        let maxString = `${maxDate.getDate()}/${maxDate.getMonth() + 1}`
        let slot = parsed.slice().filter((u) => {
            let tDate = new Date(u.date)
            let diff = today - tDate;
            if (diff < maxDiff && diff > minDiff) {
                return true
            }
        })
        realData.push([maxString, ...slot])
    }
    console.log (realData)
    let mapped = realData.map((u)=>{
        let title = u[0];
        let data = u.slice(1);
        let length = data.length;
        let allPrice = data.map((u)=>{return u.price})
        let min = Math.min(...allPrice);
        let max = Math.max(...allPrice);
        let p25;
        let p75;
        if (length > 3) {
            p25 = allPrice[Math.floor(data.length*0.25)-1];
            p75 = allPrice[Math.ceil(data.length*0.75)-1];
        } else if (length == 3) {
            p25 = allPrice[1];
            p75 = allPrice[1];
        } else {
            p25 = min;
            p75 = max;
        };
        return [title, min, p25, p75, max]
    })
    console.log (mapped)

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable(mapped, true);

        var options = {
            title: `2018 ${sRegion} Candlestick`, 
            legend: 'none'
        };

        var chart = new google.visualization.CandlestickChart(document.querySelector('#candle'));

        chart.draw(data, options);
    }
}


function chartType(chart, data, sRegion, date) {
    if (chart == "histogram") {
        histogram(data, sRegion)
    } else if (chart == "candle") {
        candle(data, sRegion, date)
    }
}




