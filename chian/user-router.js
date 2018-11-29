const passport = require('passport');

module.exports = (express) => {
	const router = express.Router();

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}

		res.redirect('/login');
	}

	router.get('/', isLoggedIn, (req, res) => {
		res.render(__dirname + '/public/index.html')
	});

	router.get('/secret', isLoggedIn, (req, res) => {
		res.send('Here you go, a secret')
	});

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

	// register 
	router.get('/register', (req, res) => {
		res.render(__dirname + '/public/register.html')
	});

	router.post('/register', (req, res) => {
		
		const username = req.body.username;
		const password = req.body.password;
		
	});

	// facebook

  router.get("/auth/facebook",passport.authenticate('facebook'));

  router.get("/auth/facebook/callback",passport.authenticate('facebook',{
      failureRedirect: "/"
  }),(req,res)=>res.redirect('/'));

	return router;
}



