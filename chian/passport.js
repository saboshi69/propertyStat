const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('./bcrypt.js');
const knex = require('knex')({
	// client: 'postgresql',
	// connection: {
	// 	database: 'chian',
	// 	user: 'chian'
	// }
	client: 'postgresql',
	connection: {
		database: 'test2',
		user: 'test2',
		password: "test2"
	}
});

bcrypt.hashPassword("12345").then(hash => console.log(hash))

module.exports = (app) => {
	app.use(passport.initialize());
	app.use(passport.session());

	// passport.use('local-login', new LocalStrategy(
	// 	async (email, password,done) => {
	// 		try {
	// 			let users = await knex('testusers').where("email", `${email}`);
	// 			if(users.length === 0) {
	// 				return done(null, false, { message: 'Incorrect credentials'}); // first argument is null because it is use to pass error.
	// 			}

	// 			let user = users[0];
	// 			let result = await bcrypt.checkPassword(password, user.password);

	// 			if (result) {
	// 				return done(null, user);
	// 			} else {
	// 				return done(null, false, {message: 'Incorrect credentials'});
	// 			}
	// 		}catch(err) {
	// 			return done(err);
	// 		}
	// 	}
	// ));

	passport.use('local-signup', new LocalStrategy(
		async (email, password, done) => {
			console.log(email, password);
			try {
				let users = await knex('testusers').where("email", `${email}`);

				if (users) {
					console.log('local-signup: email exist');
					return done(null, false, { message: 'Email already taken' })

				}
				console.log("passed email check")

				let hash = await bcrypt.hashPassword(password);
				const newUser = {
					username: null,
					email: email,
					password: hash,
					phone: null
				};
				console.log(newUser)
				let userId = await knex('users').insert(newUser).returning('id');
				//that id will be used for serializeUser
				newUser.id = userId[0];
				console.log(`id is ${newUser.id}`)
				done(null, newUser);
			} catch (err) {
				done(err);
			}
		}
	));

	// passport.serializeUser((user, done) => {
	// 	done(null, user.id);
	// });

	// passport.deserializeUser(async (id, done) => {
	// 	let users = await knex('users').where({ id: id });
	// 	if (users.length == 0) {
	// 		return done(new Error(`Wrong user id ${id}`));
	// 	}
	// 	let user = users[0];
	// 	return done(null, user);
	// });
}