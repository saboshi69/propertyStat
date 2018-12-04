const regions = {
    "HK": {
        "Kennedy Town/Sai Yin Pun": "101",
        "Sheung Wan/Central/Admiralty": "117",
        "South Horizon": "102",
        "Cyber-port": "104",
        "Aberdeen/Ap Lei Chau": "105",
        "Mid Level West": "106",
        "Happy Valley/Tai Hang": "110",
        "Mid Level North Point": "112",
        "Quarry Bay/Kornhill": "113",
        "Taikoo Shing": "114",
        "Shau Kei Wan/Chai Wan": "115",
        "Heng Fa Chuen": "116"
    },
    "KLN": {
        "Olympic Station": "201",
        "Kowloon Station": "202",
        "Mongkok/Yaumatei": "203",
        "Tsimshatsui/Jordan": "204",
        "Ho Man Tin/King's Park": "205",
        "To Kwa Wan": "206",
        "To Kwa Wan East": "219",
        "Whampoa/Laguna Verde": "207",
        "Hung Hom": "220",
        "Tseung Kwan O": "209",
        "Mei Foo/Wonderland": "210",
        "Cheung Sha Wan/Shum Shui Po": "212",
        "Cheung Sha Wan West": "211",
        "Yau Yat Tsuen/Shek Kip Mei": "213",
        "Kowloon Tong/Beacon Hill": "214",
        "Lam Tin/Yau Tong": "215",
        "Kowloon Bay/Ngau Chi Wan": "216",
        "Kwun Tong": "217",
        "Diamond Hill/Wong Tai Sin": "218"
    },
    "NTE": {
        "Sai Kung": "208",
        "Tai Wai": "301",
        "Shatin": "302",
        "Fotan/Shatin Mid Level/Kau To Shan": "303",
        "Ma On Shan": "304",
        "Tai Po Mid Level/Hong Lok Yuen": "306",
        "Tai Po Market/Tai Wo": "307",
        "Sheung Shui/Fanling": "308"
    },
    "NTW": {
        "Discovery Bay": "103",
        "Fairview Park/Palm Spring": "309",
        "Yuen Long": "401",
        "Tuen Mun": "402",
        "Tin Shui Wai": "403",
        "Tsuen Wan": "404",
        "Kwan Chung": "405",
        "Tsing Yi": "406",
        "Ma Wan/Park Island": "407",
        "Tung Chung/Islands": "408",
        "Sham Tseng/Castle Peak Road (Tuen Mun Portion)": "409",
        "Belvedere Garden/Castle Peak Road (Tsuen Wan Portion)": "410"
    }
}

function makeRegion() {
    const bRegions = Object.keys(regions)
    for (let bRegion of bRegions) {
        let parent = document.querySelector(`#${bRegion}`)
        let sRegions = Object.keys(regions[`${bRegion}`])
        for (let sRegion of sRegions) {
            let input = document.createElement("input")
            input.setAttribute("type", "checkbox");
            input.setAttribute("id", `${sRegion}`)
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

console.log (document.querySelector(".button > #good").innerHTML)

document.querySelector(".button > #good").addEventListener("click", async (e) => {
    e.preventDefault();
    let x = Array.from (document.querySelectorAll("input[type='checkbox']"))
    let sRegion = x.filter((u)=>{return u.checked == true}).map((u)=>{return u.getAttribute("value")})
    let aA = Array.from(document.querySelectorAll("input[name='actualArea']")).filter((u)=>{return u.checked == true}).map((u)=>{return u.getAttribute("value")})
    let p = Array.from(document.querySelectorAll("input[name='price']")).filter((u)=>{return u.checked == true}).map((u)=>{return u.getAttribute("value")})
    let aP = Array.from(document.querySelectorAll("input[name='actualPrice']")).filter((u)=>{return u.checked == true}).map((u)=>{return u.getAttribute("value")})

    let json = await axios.post("/", {
        sRegion: sRegion,
        actualArea: aA,
        price: p,
        actualPrice: aP
    })
    //got data without redirect!
    console.log(json.data)
})


makeRegion();