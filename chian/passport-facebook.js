const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();
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

	passport.use('facebook', new FacebookStrategy({
		clientID: process.env.FACEBOOK_ID,
		clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		callbackURL: `/auth/facebook/callback`
	}, async (accessToken, refreshToken, profile, done) => {
		console.log(profile);
		console.log(accessToken)
		try {
			let userResult = await knex('users').where({facebookid: profile.id});
			if(userResult.length === 0) {
				console.log(profile);
				let user = {
					facebookid: profile.id,
					accesstoken: accessToken
				}
				let query = await knex('users').insert(user).returning('id');

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
    let users = await knex('users').where({facebookid:id});
    if (users.length == 0) {
        return done(new Error(`Wrong user id ${id}`));
    }
    let user = users[0];
    return done(null, user);
  });



}