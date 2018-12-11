let testcaseonly = [
    ["postionA", 22.2870875958855, 114.194573965442]
]

let map;
let markers = [];
let markerCluster;
let isCluster = false;

// User enter main page and init Map
function initMap() {
    // initialize google map
    let centerLocation = {
        lat: 22.2870875,
        lng: 114.194573
    }

    map = new google.maps.Map(document.getElementById('mappy'), {
        center: centerLocation,
        zoom: 10
    })

    let zoomLv = {
        minZoom: 5,
        maxZoom: 19
    };
    map.setOptions(zoomLv);

}


function processSearchData(data) {
    // let p = Math.random() < 0.5 ? -1 : 1;
    // let ran = (10000 - (Math.random() * p)) / 10000
    let newLat = parseFloat(data[0][0])
    let newLng = parseFloat(data[0][1])
    let zoomAdj = parseFloat(data[0][2])
    //change new center
    map.setCenter({
        lat: newLat, //not define
        lng: newLng
    });

    //clear previous search markers
    console.log (markers.length)
    if (markers.length > 0){
        clearOverlays();
    }

    //remove Cluster Mode
    if (markerCluster != undefined){
        markerCluster.clearMarkers();
    }

    //change zoom
    let zoomLv = {
        minZoom: 5,
        maxZoom: 19
    };
    map.setOptions(zoomLv);
    if(zoomAdj =! undefined){
        map.setZoom(10)
    }else{        
        map.setZoom(17)
    }



    // function to add a single marker
    function addMarker(latlng) {
        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(latlng[1], latlng[2]),
            map: map
        })

        // add info for each marker
        marker.info = new google.maps.InfoWindow();
        marker.info.setContent(latlng[0]);

        // pop up info and retarget center of google map when clicking marker    
        marker.addListener('click', function () {
            markers.forEach((mk) => mk.info.close())
            let zoomLevel = map.getZoom()
            // if user already zoom in, then no need to change zoom, else zoom it
            if (zoomLevel < 17) {
                map.setZoom(17);
            }
            map.setCenter(marker.getPosition());
            marker.info.open(map, marker);
        });
        // save marker into markers array
        markers.push(marker);
    }

    
    // create all markers according to input data
    for (let i = 1; i < data.length; i++) {
        let arrFormData = [data[i].address, data[i].lat, data[i].lng];
        addMarker(arrFormData);
    }

    if (isCluster){
        clusterMode();
    }
}

function clusterMode() {
    isCluster = true;
    markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'markercluster/m'
    });
    let zoomLv = {
        minZoom: 5,
        maxZoom: 15
    };
    map.setOptions(zoomLv);
    map.setZoom(14);
}

function clearCluster(){
    isCluster = false;
    if (markerCluster != undefined){
        markerCluster.clearMarkers();
    }

}


function clearOverlays() {
    for (var i = 0; i < markers.length; i++ ) {
      markers[i].setMap(null);
    }
  }


// //onclick function for search bar
// function search(){
//       //some aJax request to get DATA from backend
//       let aJaxdata = testLoc2
//       //.then use that data
//       markers = []
//       processSearchData(aJaxdata)
// }