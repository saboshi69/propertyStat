const express = require("express");
const router = express.Router();
const dbData = require("../dbEnquiry/dbEnquiry.js")
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

// router.get("/HK", async (req, res)=>{
//     let data = await dbData();
//     let HKdata = JSON.stringify([["sRegion" , "Price"], ...data.HK])
//     let NTWdata = JSON.stringify([["sRegion" , "Price"], ...data.NTW])
//     res.json(NTWdata);
// })

router.post("/", async (req, res)=>{
    let data = await dbData(req.body);
    res.json(JSON.stringify(data))
})

module.exports = router;