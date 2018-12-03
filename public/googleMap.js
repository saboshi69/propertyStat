let testLoc = [
    ["postionA", 22.2870875958855, 114.194573965442],
    ["postionB", 22.4498361349222, 114.160553161078],
    ["postionC", 22.4596890485631, 114.170559189613],
    ["postionD", 22.2646201638187, 114.184102471654],
    ["postionE", 22.4584222600687, 114.206079553218]
]

let testLoc2 = [
    ["postionA", 22.2690360921119, 114.185354321344],
    ["postionB", 22.2839408990596, 114.136507710868],
    ["postionC", 22.2856197052874, 114.220589223878],
    ["postionD", 22.2680517647186, 114.18509229626],
    ["postionE", 22.2669680952603, 114.184917590333],
    ["postionF", 22.2870875958855, 114.194573965442],
    ["postionG", 22.4498361349222, 114.160553161078],
    ["postionH", 22.4596890485631, 114.170559189613],
    ["postionI", 22.2646201638187, 114.184102471654],
    ["postionJ", 22.4584222600687, 114.206079553218]
]


let map
let markers =[]

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
}


function processSearchData(data) {
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
            markers.forEach((mk)=>mk.info.close())
            map.setZoom(15);
            map.setCenter(marker.getPosition());
            marker.info.open(map, marker);
        });
    // save marker into markers array
        markers.push(marker)
    }
    
    // create all markers according to input data
    for (let i = 0; i < data.length; i++) {
        addMarker(data[i])
    }
}

//onclick function for search bar
function search(){
      //some aJax request to get DATA from backend
      let aJaxdata = testLoc2

      //.then use that data
      markers = []
      processSearchData(aJaxdata)
}
