async function listSearchData(data) {
    //filter right latlng
    //hey samuel
    //i dun understand your filter logic for your map
    //if u have time please replace my filter logic with yours
    //yours seems behave better
    let allLat = [];
    let allLng = [];
    for (let i = 1; i < data.length; i++) {
        let lat = parseFloat(data[i].lat);
        let lng = parseFloat(data[i].lng);
        if (lat) { await allLat.push(lat) };
        if (lng) { await allLng.push(lng) }
    }
    let latAvg = allLat.reduce((a, b) => { return a + b }) / allLat.length;
    let lngAvg = allLng.reduce((a, b) => { return a + b }) / allLng.length;
    let cleanData = data.filter((u) => {
        let lat = parseFloat(u.lat);
        let lng = parseFloat(u.lng);
        let distance = measure(lat, lng, latAvg, lngAvg)
        return distance < 400
    }).sort((u, v) => {
        let ulat = parseFloat(u.lat);
        let ulng = parseFloat(u.lng);
        let vlat = parseFloat(v.lat);
        let vlng = parseFloat(v.lng);
        let udistance = measure(ulat, ulng, latAvg, lngAvg);
        let vdistance = measure(vlat, vlng, latAvg, lngAvg);
        return udistance - vdistance
    })
    //end of my filter logic

    //below is irrelevant to filtering

    let superParent = document.querySelector("#fkingLong")
    let itemsPerPage = 30;
    let length = cleanData.length - 1;
    let page = Math.ceil(length / itemsPerPage);
    let groupData = chunk(cleanData, itemsPerPage)
    let btnParent = document.querySelector("#paginator")
    for (let i = 0; i < page; i++) {
        //create btn
        let pag = document.createElement("button");
        pag.setAttribute("class", "pag");
        pag.innerHTML = `${i + 1}`;
        btnParent.appendChild(pag);

        //create div container
        let parent = document.createElement("div");
        parent.setAttribute("class", `container container${i + 1}`);
        superParent.appendChild(parent);

        //put things inside parent
        for (let u of groupData[i]) {

            if (data.indexOf(u) > 0) {
                let div = document.createElement("div");
                div.setAttribute("class", "searchResult");

                let sr = document.createElement("p");
                sr.setAttribute("class", "searchContent srSearch")
                sr.innerHTML = `Region: ${u.sRegion}`

                let add = document.createElement("p");
                add.setAttribute("class", "searchContent addSearch")
                add.innerHTML = `Address: ${u.address}`

                let aA = document.createElement("p");
                aA.setAttribute("class", "searchContent aASearch")
                aA.innerHTML = `Actual Area: ${u.actualArea}ft`

                let aP = document.createElement("p");
                aP.setAttribute("class", "searchContent aPSearch")
                aP.innerHTML = `Price per ft(Actual Area): $${u.actualPrice}`

                let p = document.createElement("p");
                p.setAttribute("class", "searchContent pSearch")
                p.innerHTML = `Price: $${u.price}M`

                let bookmark = document.createElement("button");
                bookmark.setAttribute("id", `${u.id}`)
                bookmark.innerHTML = `Bookmark Property No. ${u.id}`

                div.appendChild(sr);
                div.appendChild(add);
                div.appendChild(aA);
                div.appendChild(aP);
                div.appendChild(p);
                div.appendChild(bookmark)

                parent.appendChild(div)
            }
        }

        Array.from(document.querySelectorAll("#fkingLong > div")).map((a)=>{
            let classname = a.getAttribute("class");
            let num = classname.slice(19)
            if (num == 1){
                a.style.display = "flex";
            } else {
                a.style.display = "none"
            }
        })

        //paginator logic
        Array.from(document.querySelectorAll(".pag")).map((u) => {
            return u.addEventListener("click", (e) => {
                e.preventDefault();
                let index = u.innerHTML;
                Array.from(document.querySelectorAll("#fkingLong > div")).map((v) => {
                    let classname = v.getAttribute("class");
                    let num = classname.slice(19)
                    if (num == index) {
                        v.style.display = "flex";
                    } else {
                        v.style.display = "none";
                    }
                })
            })
        })
    }

}

function measure(lat1, lng1, lat2, lng2) {  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLng = lng2 * Math.PI / 180 - lng1 * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d * 1000; // meters
}

function chunk(array, size) {
    const chunked_arr = [];
    let index = 0;
    while (index < array.length) {
        chunked_arr.push(array.slice(index, size + index));
        index += size;
    }
    return chunked_arr;
}