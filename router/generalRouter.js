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
const dbUpdateUser = require("../dbEnquiry/dbUpdateUser").updateUser
// const dbBridge = require("../dbEnquiry/dbUpdateBridge")

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

router.get("/realIndex", (req, res) => {
    res.sendFile("realIndex.html");
})

router.get("/", async (req, res) => {
    if (req.session.passport) {
        let user = await dbGetUser(req.session.passport.user)
        res.render("index", ({ user: user }));
    } else {
        res.render("index", ({ user: false}))
    }
});

router.post("/", isLoggedIn, async (req, res) => {
    console.log(req.body)
    let data = await dbData(req.body);
    res.json(JSON.stringify(data))
})

router.post("/searchResult", async (req, res) => {
    console.log(req.body);
    //req.body should be in the format like this: ["postionA", 22.333147, 114.193441]
    let data = await dbGeocode(req.body);
    res.json(JSON.stringify(data))
})

//still inprogress
router.post("/searchGeo", async (req, res) => {
    let body = Object.keys(req.body)[0]

    // console.log("passing front end add:" + body)

    let latlng = await dBgetLatLng(body)
    let data = await dbSearchBarGeocode(latlng);
    res.json(JSON.stringify(data))
})


// USER LOGIN / REGISTER  //

router.get("/login", async (req, res) => {
    res.render("login")
})
router.post("/login", passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/err'
}))

router.get("/logout", async(req, res) => {
    try {
        req.logout();
        req.session.destroy();
        res.redirect("/");
    } catch(e) {
        console.log(e);
    }
    
});

router.get("/register", async (req, res) => {
    res.render("register")
})
router.post("/register", passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/err'
}))

router.get("/err", async (req, res) => {
    res.render("err")
})

router.get("/updateuser", async(req, res) => {
    
 if (req.session.passport) {
        let user = await dbGetUser(req.session.passport.user)
        res.render("updateUser", {user: user});
    } else {
        res.render("index", ({ user: false }))
    }
});

router.post("/updateuser", async(req, res) => {

    if (req.session.passport) {
        let user = await dbUpdateUser(req.session.passport.user, req.body)
        res.redirect('/user');
        // res.render("user", ({ user: user.ac, email: user.email, phone: user.phone }));
    } else {
        res.render("index", ({ user: false }))
    }
})

router.get("/user", async (req, res) => {
    if (req.session.passport) {
        let user = await dbGetUser(req.session.passport.user)
        res.render("user", {user: user});
    } else {
        res.render("index", ({ user: false }))
    }
});

// USER LOGIN / REGISTER  - END //

// bookmark
router.post("/bookmark", async (req, res) => {
    if (req.session.passport) {
        let id = req.body.id;
        let userid = req.session.passport.user
        let x = await dbBridge.dbInsertBridge(id, userid);
        if (x) {
            let user = await dbGetUser(req.session.passport.user)
            res.json({ user: user.ac })
        }
    } else {
        res.render("err")
    }
})

router.post("/checkBookmark", async (req, res) => {
    if (req.session.passport) {
        let id = req.body.id;
        let userid = req.session.passport.user
        let x = await dbBridge.dbCheckBridge(id, userid);
        if (x == "done") {
            let user = await dbGetUser(req.session.passport.user)
            res.json({ user: user.ac, x:x})
        } else {
            res.send("err")
        }
    } else {
        res.send("err")
    }
})

//facebook
router.get("/auth/facebook", passport.authenticate('facebook', { scope: ['email'] }));

router.get("/auth/facebook/callback", passport.authenticate('facebook', {
    failureRedirect: "/login"
}), (req, res) => res.redirect('/'));

module.exports = router;