const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('./bcrypt.js');
const knex = require('knex')({
	client: 'postgresql',
	connection: {
		database: 'test2',
		user: 'test2',
		password: 'test2'
	}
});


module.exports = (app) => {
	app.use(passport.initialize());
	app.use(passport.session());

	passport.use('local-login', new LocalStrategy(
		{
			usernameField: 'username',
			passwordField: 'password',
			passReqToCallback: true
		},
		async (req, username, password, done) => {

			try {
				let users = await knex('testusers').where("username", `${username}`).orWhere("email", `${username}`).orWhere("phone", `${username}`)
				if (users.length === 0) {
					return done(null, false, { message: 'Incorrect credentials' }); // first argument is null because it is use to pass error.
				}

				let user = users[0];
				let result = await bcrypt.checkPassword(password, user.password);

				if (result) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Incorrect credentials' });
				}
			} catch (err) {
				return done(err);
			}
		}
	));

	passport.use('local-signup', new LocalStrategy(
		{
			usernameField: 'username',
			passwordField: 'password',
			passReqToCallback: true
		},
		async (req, username, password, done) => {
			console.log(username, password);
			try {
				let users = await knex('testusers').where("username", `${username}`).orWhere("email", `${req.body.email}`).orWhere("phone", `${req.body.phone}`)

				if (users.length > 0) {
					console.log(`local-signup: ${username} exist`);
					return done(null, false, { message: 'username already taken' })

				}

				let hash = await bcrypt.hashPassword(password);
				const newUser = {
					username:username,
					email: req.body.email,
					password: hash,
					phone: req.body.phone
				};
				let userId = await knex('testusers').insert(newUser).returning('id');
				newUser.id = userId[0];
				console.log (newUser)
				done(null, newUser);
			} catch (err) {
				done(err);
			}
		}
	));

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		let users = await knex('testusers').where({ id: id });
		if (users.length == 0) {
			return done(new Error(`Wrong user id ${id}`));
		}
		let user = users[0];
		return done(null, user);
	});
}