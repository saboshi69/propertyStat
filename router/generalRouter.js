const express = require("express");
const router = express.Router();
const dbData = require("../dbEnquiry/dbEnquiry.js")

router.get("/", async (req, res)=>{
    let data = await dbData();
    let HKdata = JSON.stringify([["sRegion, Price"], ...data.HK])
    let NTWdata = JSON.stringify([["sRegion, Price"], ...data.NTW])
    res.render("index", ({HKdata: HKdata, NTWdata: NTWdata}))
})