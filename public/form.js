// const regions = {
//     "HK": {
//         "Kennedy Town/Sai Yin Pun": "101",
//         "Sheung Wan/Central/Admiralty": "117",
//         "South Horizon": "102",
//         "Cyber-port": "104",
//         "Aberdeen/Ap Lei Chau": "105",
//         "Mid Level West": "106",
//         "Happy Valley/Tai Hang": "110",
//         "Mid Level North Point": "112",
//         "Quarry Bay/Kornhill": "113",
//         "Taikoo Shing": "114",
//         "Shau Kei Wan/Chai Wan": "115",
//         "Heng Fa Chuen": "116"
//     },
//     "KLN": {
//         "Olympic Station": "201",
//         "Kowloon Station": "202",
//         "Mongkok/Yaumatei": "203",
//         "Tsimshatsui/Jordan": "204",
//         "Ho Man Tin/King's Park": "205",
//         "To Kwa Wan": "206",
//         "To Kwa Wan East": "219",
//         "Whampoa/Laguna Verde": "207",
//         "Hung Hom": "220",
//         "Tseung Kwan O": "209",
//         "Mei Foo/Wonderland": "210",
//         "Cheung Sha Wan/Shum Shui Po": "212",
//         "Cheung Sha Wan West": "211",
//         "Yau Yat Tsuen/Shek Kip Mei": "213",
//         "Kowloon Tong/Beacon Hill": "214",
//         "Lam Tin/Yau Tong": "215",
//         "Kowloon Bay/Ngau Chi Wan": "216",
//         "Kwun Tong": "217",
//         "Diamond Hill/Wong Tai Sin": "218"
//     },
//     "NTE": {
//         "Sai Kung": "208",
//         "Tai Wai": "301",
//         "Shatin": "302",
//         "Fotan/Shatin Mid Level/Kau To Shan": "303",
//         "Ma On Shan": "304",
//         "Tai Po Mid Level/Hong Lok Yuen": "306",
//         "Tai Po Market/Tai Wo": "307",
//         "Sheung Shui/Fanling": "308"
//     },
//     "NTW": {
//         "Discovery Bay": "103",
//         "Fairview Park/Palm Spring": "309",
//         "Yuen Long": "401",
//         "Tuen Mun": "402",
//         "Tin Shui Wai": "403",
//         "Tsuen Wan": "404",
//         "Kwan Chung": "405",
//         "Tsing Yi": "406",
//         "Ma Wan/Park Island": "407",
//         "Tung Chung/Islands": "408",
//         "Sham Tseng/Castle Peak Road (Tuen Mun Portion)": "409",
//         "Belvedere Garden/Castle Peak Road (Tsuen Wan Portion)": "410"
//     }
// }

//const _ = require("lodash")

const regions = {
    "HK": {
        "Kennedy Town/Sai Yin Pun": [22.279318, 114.13695],
        "Sheung Wan/Central/Admiralty": [22.281949, 114.158249],
        "South Horizon": [22.243373, 114.147651],
        "Cyber-port": [22.271379, 114.139984],
        "Aberdeen/Ap Lei Chau": [22.248307, 114.15244],
        "Mid Level West": [22.283364, 114.14825],
        "Happy Valley/Tai Hang": [22.277491, 114.191342],
        "Mid Level North Point": [22.29128, 114.200478],
        "Quarry Bay/Kornhill": [22.287905, 114.209747],
        "Taikoo Shing": [22.285006, 114.216099],
        "Shau Kei Wan/Chai Wan": [22.272894, 114.232814],
        "Heng Fa Chuen": [22.276905, 114.239917]
    },
    "KLN": {
        "Olympic Station": [22.318195, 114.160267],
        "Kowloon Station": [22.304282, 114.162247],
        "Mongkok/Yaumatei": [22.315737, 114.169923],
        "Tsimshatsui/Jordan": [22.298912, 114.171929],
        "Ho Man Tin/King's Park": [22.309386, 114.182711],
        "To Kwa Wan": [22.317337, 114.187969],
        "To Kwa Wan East": [22.317696, 114.190868],
        "Whampoa/Laguna Verde": [22.306561, 114.184495],
        "Hung Hom": [22.302875, 114.182196],
        "Tseung Kwan O": [22.311936, 114.256878],
        "Mei Foo/Wonderland": [22.337585, 114.137984],
        "Cheung Sha Wan/Shum Shui Po": [22.32859, 114.160285],
        "Cheung Sha Wan West": [22.336188, 114.153337],
        "Yau Yat Tsuen/Shek Kip Mei": [22.332134, 114.168763],
        "Kowloon Tong/Beacon Hill": [22.33824, 114.177824],
        "Lam Tin/Yau Tong": [22.30802, 114.237564
        ],
        "Kowloon Bay/Ngau Chi Wan": [22.335637, 114.208432],
        "Kwun Tong": [22.310369, 114.222703],
        "Diamond Hill/Wong Tai Sin": [22.340785, 114.19788]
    },
    "NTE": {
        "Sai Kung": [22.382582, 114.269952],
        "Tai Wai": [22.369729, 114.173661],
        "Shatin": [22.37713, 114.19744
        ],
        "Fotan/Shatin Mid Level/Kau To Shan": [22.399404, 114.192511],
        "Ma On Shan": [22.427676, 114.240275
        ],
        "Tai Po Mid Level/Hong Lok Yuen": [22.460682, 114.154339],
        "Tai Po Market/Tai Wo": [22.445687, 114.167072
        ],
        "Sheung Shui/Fanling": [22.498873, 114.146838]
    },
    "NTW": {
        "Discovery Bay": [22.292141, 114.010147
        ],
        "Fairview Park/Palm Spring": [22.478141, 114.044266
        ],
        "Yuen Long": [22.444538, 114.022208],
        "Tuen Mun": [22.39083, 113.972513
        ],
        "Tin Shui Wai": [22.460642, 114.0042
        ],
        "Tsuen Wan": [22.369912, 114.114431],
        "Kwan Chung": [22.363253, 114.131126],
        "Tsing Yi": [22.348982, 114.104786
        ],
        "Ma Wan/Park Island": [22.350075, 114.059207
        ],
        "Tung Chung/Islands": [22.287374, 113.942509
        ],
        "Sham Tseng/Castle Peak Road (Tuen Mun Portion)": [22.366618, 114.063936],
        "Belvedere Garden/Castle Peak Road (Tsuen Wan Portion)": [22.371738, 114.101202]
    }
}



function makeRegion() {
    const bRegions = Object.keys(regions)
    for (let bRegion of bRegions) {
        let parent = document.querySelector(`#${bRegion}`)
        let pairs = []
        let sRegions = Object.keys(regions[`${bRegion}`])
        let latlng = Object.values(regions[`${bRegion}`])
        for (let i = 0; i < sRegions.length; i++) {
            let arr = [sRegions[i], `${latlng[i][0]},${latlng[i][1]}`]
            pairs.push(arr)
        }
        for (let pair of pairs) {
            let sRegion = pair[0];
            let latlng = pair[1];
            let input = document.createElement("input")
            input.setAttribute("type", "checkbox");
            input.setAttribute("id", `${latlng}`)
            input.setAttribute("name", "sRegion")
            input.setAttribute("value", `${sRegion}`)
            input.innerHTML = `${sRegion}`;
            let label = document.createElement("label");
            label.setAttribute("for", `${sRegion}`);
            label.innerHTML = `${sRegion}`
            let br = document.createElement("br")
            parent.appendChild(input)
            parent.appendChild(label)
            parent.appendChild(br)
        }
    }
}


document.querySelector(".button > #good").addEventListener("click", async (e) => {
    e.preventDefault();
    let x = Array.from(document.querySelectorAll("input[type='checkbox']"))
    let sRegion = x.filter((u) => {
        return u.checked == true
    }).map((u) => {
        return u.getAttribute("value")
    })
    let aA = Array.from(document.querySelectorAll("input[name='actualArea']")).filter((u) => {
        return u.checked == true
    }).map((u) => {
        return u.getAttribute("value")
    })
    let p = Array.from(document.querySelectorAll("input[name='price']")).filter((u) => {
        return u.checked == true
    }).map((u) => {
        return u.getAttribute("value")
    })
    let aP = Array.from(document.querySelectorAll("input[name='actualPrice']")).filter((u) => {
        return u.checked == true
    }).map((u) => {
        return u.getAttribute("value")
    })
    let date = Array.from(document.querySelectorAll("input[name='date']")).filter((u) => {
        return u.checked == true
    }).map((u) => {
        return u.getAttribute("value")
    })
    let chart = Array.from(document.querySelectorAll("input[name='chart']")).filter((u) => {
        return u.checked == true
    }).map((u) => {
        return u.getAttribute("value")
    })
    let latlng = x.filter((u) => {
        return u.checked == true
    }).map((u) => {
        return u.getAttribute("id")
    })

    let json = await axios.post("/", {
        sRegion: sRegion,
        actualArea: aA,
        price: p,
        actualPrice: aP,
        date: date,
        latlng: latlng
    })
    //got data without redirect!
    chartType(chart, json.data, sRegion, date)
    console.log (json.data)
})


makeRegion();