const express = require("express");
const router = express.Router();
const dbData = require("../dbEnquiry/dbEnquiry.js")
const dbGeocode = require("../dbEnquiry/dbGeocode.js")
const dBgetLatLng = require("../dbEnquiry/dBgetLatLng.js")
const dbSearchBarGeocode = require("../dbEnquiry/dbSearchBarGeocode.js")
const bodyParser = require("body-parser");
const _ = require("lodash")
const passport = require('passport');
const dbGetUser = require("../dbEnquiry/dbGetUser")

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

router.get("/", async (req, res)=>{
    if (req.session.passport){
        let user = await dbGetUser(req.session.passport.user)
        res.render("index", ({user:user.ac}));
    } else {
        res.render("index", ({user: "not yet login"}))
    }
});

router.get('/users/:id', (req, res) => {
	res.render("user", testUser);
});

router.post("/", isLoggedIn,async (req, res)=>{
    console.log (req.body)
    let data = await dbData(req.body);
    res.json(JSON.stringify(data))
})

router.post("/searchResult", async(req, res)=>{
    console.log (req.body);
    //req.body should be in the format like this: ["postionA", 22.333147, 114.193441]
    let data = await dbGeocode(req.body);
    res.json(JSON.stringify(data))
})

//still inprogress
router.post("/searchGeo", async(req, res)=>{
    let body = Object.keys(req.body)[0]
    console.log("passing front end add:" + body)
    let latlng = await dBgetLatLng(body)
    let data = await dbSearchBarGeocode(latlng);
    res.json(JSON.stringify(data))
})

router.get("/login", async(req,res)=>{
    res.render("login")
})
router.post("/login", passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/err'
}),(req, res)=>{
    //console.log (req.session)
    console.log (req.session.session)
})
router.get("/register", async(req, res)=>{
    res.render("register")
})
router.post("/register", passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/err'
}), (req, res)=>{
    //console.log (req.session)
    //console.log (req.session.user)
})

router.get("/err", async(req, res)=>{
    res.render("err")
})

router.get("/user", async(req, res)=>{
    if (req.session.passport){
        let user = await dbGetUser(req.session.passport.user)
        res.render("user", ({user:user.ac, email:user.email, phone: user.phone}));
    } else {
        res.render("index", ({user: "not yet login"}))
    }
})
module.exports = router;