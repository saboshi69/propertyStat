const express = require("express");
const router = express.Router();
const dbData = require("../dbEnquiry/dbEnquiry.js")

router.get("/", (req, res)=>{
    res.render("index");
})

router.get("/HK", async (req, res)=>{
    let data = await dbData();
    let HKdata = JSON.stringify([["sRegion" , "Price"], ...data.HK])
    let NTWdata = JSON.stringify([["sRegion" , "Price"], ...data.NTW])
    res.json(HKdata);
})

module.exports = router;