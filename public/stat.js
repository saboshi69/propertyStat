

async function realGraph() {
    let json = await axios.get("/HK")
    console.log(json.data)
    let HK = await JSON.parse(json.data);
    //let NTW = JSON.parse(json).NTWdata;
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        let HKgraph = google.visualization.arrayToDataTable(HK);
        // let NTWgraph = google.visualization.arrayToDataTable(NTWdata);
        let options = {
            title: "HK island price distribution 2018",
            legend: { position: 'none' },
            colors: ['#4285F4'],

            chartArea: { width: 401 },
            hAxis: {
                ticks: [0,10,20,30]
            },
            bar: { gap: 0 },

            histogram: {
                bucketSize: 0.01,
                maxNumBuckets: 2000,
                minValue: 0,
                maxValue: 30
            }
        }
        let chart = new google.visualization.Histogram(document.querySelector("#chart"));
        chart.draw(HKgraph, options)
    }
}
window.onload = function () {
    realGraph();
}
