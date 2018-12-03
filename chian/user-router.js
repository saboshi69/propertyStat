const passport = require('passport');

module.exports = (express) => {
	const router = express.Router();

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}

		res.redirect('/login');
	}

	router.get('/', (req, res) => {
		res.render(__dirname + '/public/index.html')
	});

	router.get('/secret', isLoggedIn, (req, res) => {
		res.send('Here you go, a secret')
	});

	// register 
	router.get('/signup', (req, res) => {
		res.render(__dirname + '/public/signup.html');
	});

	router.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/error_signup'
	}));

	// log in
	router.get('/login', (req, res) => {
		res.render(__dirname + '/public/login.html')
	});

	router.post('/login', passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/error'
	}));

	router.get('/error', (req, res) => {
		res.render(__dirname + '/public/error_login.html')
	});

	router.get('/error_signup', (req, res) => {
		res.render(__dirname + '/public/error_signup.html')
	});



	// facebook

  router.get("/auth/facebook",passport.authenticate('facebook'));

  router.get("/auth/facebook/callback",passport.authenticate('facebook',{
      failureRedirect: "/"
  }),(req,res)=>res.redirect('/'));

	return router;
}



