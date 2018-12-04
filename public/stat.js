

// async function realGraph() {
//     let json = await axios.get("/HK")
//     let HK = await JSON.parse(json.data);
//     //let NTW = JSON.parse(json).NTWdata;
//     google.charts.load("current", { packages: ["corechart"] });
//     google.charts.setOnLoadCallback(drawChart);
//     function drawChart() {
//         let HKgraph = google.visualization.arrayToDataTable(HK);
//         // let NTWgraph = google.visualization.arrayToDataTable(NTWdata);
//         let options = {
//             title: "NTW price distribution 2018",
//             legend: { position: 'none' },
//             colors: ['#4285F4'],

//             chartArea: { width: 401 },
//             hAxis: {
//                 ticks: [0,2,4,6,8,10]
//             },
//             bar: { gap: 0 },

//             histogram: {
//                 bucketSize: 0.01,
//                 maxNumBuckets: 100,
//                 minValue: 0,
//                 maxValue: 10
//             }
//         }
//         let chart = new google.visualization.Histogram(document.querySelector("#chart"));
//         chart.draw(HKgraph, options)
//     }
// }

// realGraph();

