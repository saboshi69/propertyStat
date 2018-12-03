const express = require('express');
const app = express();
const session = require('express-session');
const setupPassport = require('./passport');
const setupPassportFb = require('./passport-facebook');
const bodyParser = require('body-parser');
const userRouter = require('./user-router')(express);
const fs = require('fs');
const passport = require('passport');
// const flash = require('connect-flash');
const https = require('https')

// const port = process.env.PORT || 3030;

app.use(session({
	secret: 'supersecret'
}));

setupPassport(app);
setupPassportFb(app);



// to be remove when combined to main app.
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser());

// local passport + facebook passport + user route

app.use('/', userRouter);


const httpsOptions = {
  key: fs.readFileSync('./localhost.key'),
  cert: fs.readFileSync('./localhost.crt')
}

https.createServer(httpsOptions, app).listen(3000);
