const express = require("express");
const router = express.Router();
const dbData = require("../dbEnquiry/dbEnquiry.js")
const dbGeocode = require("../dbEnquiry/dbGeocode.js")
const bodyParser = require("body-parser");
const _ = require("lodash")

router.get("/", (req, res)=>{
    res.render("index");
})

router.post("/", async (req, res)=>{
    console.log (req.body);
    let data = await dbData(req.body);
    res.json(JSON.stringify(data))
})

router.post("/searchResult", (req, res)=>{
    console.log (req.body);
    //req.body should be in the format like this: ["postionA", 22.333147, 114.193441]
    let data = await dbGeocode(req.body);
    res.json(JSON.stringify(data))
})

module.exports = router;