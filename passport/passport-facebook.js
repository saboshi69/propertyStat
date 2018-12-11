const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();
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

	passport.use('facebook', new FacebookStrategy({
		clientID: process.env.FACEBOOK_ID,
		clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		callbackURL: `/auth/facebook/callback`
	}, async (accessToken, refreshToken, profile, done) => {
		try {
			let userResult = await knex('testusers').where({username: profile.id});
			if(userResult.length === 0) {
	
				let user = {
					username: profile.id
				}
				let query = await knex('testusers').insert(user).returning('id');

				user.id = query[0];
				done(null,user);
			} else {
				done(null, userResult[0])
			} 			
		} catch(err) {
			return done(err);
		}
		
    
	}));


	passport.serializeUser((user, done) => {
		done(null, user.profile.id);

	});

	passport.deserializeUser( async (id,done)=>{
    let users = await knex('testusers').where({username:id});
    if (users.length == 0) {
        return done(new Error(`Wrong user id ${id}`));
    }
    let user = users[0];
    return done(null, user);
  });



}