const fs = require("fs");
let arr = [];
fs.readFile("NTW2018_401.json", "utf8", async (err, data)=>{
    if (err) console.log (err);
    let parsed = JSON.parse(data);
    console.log (parsed.length);
    
    for (let i=0; i<parsed.length; i++){
        await arr.push (parsed[i])
    }

    let newArr = arr.map((u)=>{
        delete u.id;
        return u
    });
    fs.writeFile("NTW2018_401.json", JSON.stringify(newArr),err => (err) ? console.log(err) : console.log("writeFile success"))
})