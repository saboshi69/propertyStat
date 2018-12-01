

async function realGraph (){
    let json = await axios.get("/")
    let HK = JSON.parse(json).HKdata;
    let NTW = JSON.parse(json).NTWdata;
    await google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart(){
        let HKgraph = google.visualization.arrayToDataTable(HK);
        // let NTWgraph = google.visualization.arrayToDataTable(NTWdata);
        let options = {
            title: "HK island price distribution 2018",
            legend: {position: "none"}
        }
        let chart = new google.visualization.Histogram(document.querySelector("#chart"));
        chart.draw(HKgraph, options)
    }
}

realGraph();