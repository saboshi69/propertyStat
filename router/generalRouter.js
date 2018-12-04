const express = require("express");
const router = express.Router();
const dbData = require("../dbEnquiry/dbEnquiry.js")
const bodyParser = require("body-parser");
const _ = require("lodash")

router.get("/", (req, res)=>{
    res.render("index");
})

// router.get("/HK", async (req, res)=>{
//     let data = await dbData();
//     let HKdata = JSON.stringify([["sRegion" , "Price"], ...data.HK])
//     let NTWdata = JSON.stringify([["sRegion" , "Price"], ...data.NTW])
//     res.json(NTWdata);
// })

router.post("/", async (req, res)=>{
    console.log (req.body);
    let data = await dbData(req.body);
    res.json(JSON.stringify(data))
})

module.exports = router;