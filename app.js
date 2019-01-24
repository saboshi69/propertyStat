const express = require("express");
const fs = require("nano-fs");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors")
const router = require("./router/generalRouter")
const hbs = require("express-handlebars")
const session = require('express-session');
const setupPassport = require('./passport/passport');
const setupPassportFb = require('./passport/passport-facebook');
const passport = require('passport');
const https = require('https')
const cookieSession = require("cookie-session")

const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "test2",
        user: "test2",
        password: "test2"
    }
});

const app = express();

app.use(session({
	secret: 'supersecret'
}));

// app.use(cookieSession({
//     maxAge:1000*60*30,
//     keys:['shortasfuck']
// }))

setupPassport(app);
setupPassportFb(app);

//view engine setup
app.engine("handlebars", hbs({ extname: "handlebars", defaultLayout: "main", layoutsDir: `${__dirname}/views/layouts` }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

//calculator 
require('./calculator')(app)


app.use("/", router)


const httpsOptions = {
    key: fs.readFileSync('./passport/localhost.key'),
    cert: fs.readFileSync('./passport/localhost.crt')
  }
  
https.createServer(httpsOptions, app).listen(process.env.PORT || 3000);
  

console.log('listen3000')

