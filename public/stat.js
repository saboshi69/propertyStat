
let json = [{ "sRegion": "Tai Po Market/Tai Wo", "actualArea": 1574, "price": 26.98, "actualPrice": 17144, "lat": 22.4498, "lng": 114.168 }, { "sRegion": "Tai Po Market/Tai Wo", "actualArea": 620, "price": 10.9, "actualPrice": 17581, "lat": 22.4435, "lng": 114.17 }, { "sRegion": "Tai Po Market/Tai Wo", "actualArea": 620, "price": 10.9, "actualPrice": 17581, "lat": 22.4436, "lng": 114.169 }, { "sRegion": "Tai Po Market/Tai Wo", "actualArea": 2023, "price": 34.72, "actualPrice": 17165, "lat": 22.4498, "lng": 114.168 }, { "sRegion": "Tai Po Market/Tai Wo", "actualArea": 1555, "price": 27.54, "actualPrice": 17710, "lat": 22.4498, "lng": 114.168 }, { "sRegion": "Belvedere Garden/Castle Peak Road (Tsuen Wan Portion)", "actualArea": 644, "price": 10.7, "actualPrice": 16615, "lat": 22.3723, "lng": 114.103 }, { "sRegion": "Belvedere Garden/Castle Peak Road (Tsuen Wan Portion)", "actualArea": 738, "price": 11.29, "actualPrice": 15298, "lat": 22.3725, "lng": 114.103 }, { "sRegion": "Belvedere Garden/Castle Peak Road (Tsuen Wan Portion)", "actualArea": 2432, "price": 40.8, "actualPrice": 16776, "lat": 22.3689, "lng": 114.094 }, { "sRegion": "Belvedere Garden/Castle Peak Road (Tsuen Wan Portion)", "actualArea": 738, "price": 11.38, "actualPrice": 15420, "lat": 22.3723, "lng": 114.103 }, { "sRegion": "Belvedere Garden/Castle Peak Road (Tsuen Wan Portion)", "actualArea": 2413, "price": 38.8, "actualPrice": 16080, "lat": 22.3689, "lng": 114.094 }]


function tick(min, max){
    let arr = [];
    let diff = (Math.ceil(max) - Math.floor(min))/9
    arr.push(Math.floor(min))
    for (let i=0; i<9; i++){
        arr.push(Math.floor(min) + diff*(i+1))
    }
    return arr;
}

async function histogram(data, sRegion) {
    let parsed = JSON.parse(data)
    let mapped = parsed.slice().map((u)=>{
        return [u.sRegion, u.price]
    })
    let allPrice = parsed.slice().filter((u)=>{return u != NaN}).map((u)=>{return u[1]})
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

            animation: {
                "startup": true,
                "duration": 500,
                "easing": "out"
            },

            chartArea: { width: 401 },
            // hAxis: {
            //     ticks: tick(minPrice, maxPrice)
            // },
            bar: { gap: 0 },

            histogram: {
                bucketSize: 0.01,
                maxNumBuckets: maxPrice/0.01,
                minValue: minPrice,
                maxValue: maxPrice
            }
        }
        let chart = new google.visualization.Histogram(document.querySelector("#chart"));
        chart.draw(graph, options)
    }
}




