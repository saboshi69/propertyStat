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

router.post("/", (req, res)=>{
    console.log (req.body);
    let x = _.toPairs(req.body).filter((u)=>{return u[1].length > 0})
    console.log (x)
    console.log (Object.values(req.body).map((u)=>{return u[0]}).filter((u)=>{return u != undefined}).length)
    res.json(req.body);
})

module.exports = router;