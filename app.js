const express = require("express");
const fs = require("nano-fs");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors")
const router = require("./router/generalRouter")
const hbs = require("express-handlebars")
const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "test2",
        user: "test2",
        password: "test2"
    }
});

const app = express();

//view engine setup
app.engine("handlebars", hbs({ extname: "handlebars", defaultLayout: "main", layoutsDir: `${__dirname}/views/layouts` }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", router)
app.get('/register', function (req, res) {
    res.sendFile(__dirname + '/register.html')
});
app.get('/mainmap', function (req, res) {
    res.sendFile(__dirname + '/googleMap.html')
});

app.get('/search', function (req, res) {
    res.sendFile(__dirname + '/quicksearch.html')
});

app.listen(8080, ()=>{
    console.log ("you are now on 8080")
})