const express = require("express");
const router = express.Router();
const dbData = require("../dbEnquiry/dbEnquiry.js")
const dbGeocode = require("../dbEnquiry/dbGeocode.js")
const bodyParser = require("body-parser");
const _ = require("lodash")

router.get("/", (req, res)=>{
    res.render("index");
});


var testUser = { 
	name: "Lee",
	email: "lee@example.com",
	age: "20",
	occupation: "software engineer",
	bookmark: ['PropertyA', 'PropertyB', 'PropertyC']
}

router.get('/users/:id', (req, res) => {
	res.render("user", testUser);
});

router.post("/", async (req, res)=>{
    let data = await dbData(req.body);
    res.json(JSON.stringify(data))
})



router.post("/searchResult", async(req, res)=>{
    console.log (req.body);
    //req.body should be in the format like this: ["postionA", 22.333147, 114.193441]
    let data = await dbGeocode(req.body);
    res.json(JSON.stringify(data))
})

module.exports = router;