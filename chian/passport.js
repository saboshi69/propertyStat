const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('./bcrypt.js');
const knex = require('knex')({
	client: 'postgresql',
	connection: {
		database: 'chian',
		user: 'chian'
	}
});


module.exports = (app) => {
	app.use(passport.initialize());
	app.use(passport.session());

	passport.use('local-login', new LocalStrategy(
		async (email, password, done) => {
			try {
				let users = await knex('users').where({email: email});
				if(users.length === 0) {
					return done(null, false, { message: 'Incorrect credentials'}); // first argument is null because it is use to pass error.
				}

				let user = users[0];
				let result = await bcrypt.checkPassword(password, user.password);

				if (result) {
					return done(null, user);
				} else {
					return done(null, false, {message: 'Incorrect credentials'});
				}
			}catch(err) {
				return done(err);
			}
		}
	));

	passport.use('local-signup', new LocalStrategy(
		async (email, password, done) => {
			console.log(email, password);
			try {
				let users = await knex('users').where({email: email});

				if(users.length > 0) {
					console.log('exist');
					return done(null, false, { message: 'Email already taken'})

				}

				let hash = await bcrypt.hashPassword(password);
				const newUser = {
					email: email,
					password: hash
				};
				let userId = await knex('users').insert(newUser).returning('id');
				newUser.id = userId[0];
				done(null, newUser);
			} catch(err) {
				done(err);
			}
		}
	));
	
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
    let users = await knex('users').where({id:id});
    if (users.length == 0) {
        return done(new Error(`Wrong user id ${id}`));
    }
    let user = users[0];
    return done(null, user);
  });
}