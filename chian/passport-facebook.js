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
	passport.use('facebook', new FacebookStrategy({
		clientID: process.env.FACEBOOK_ID,
		clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		callbackURL: `/auth/facebook/callback`
	}, (accessToken, refreshToken, profile, done) => {
//we will need to add additional columns into your database for this to work, currently the table users does not have a facebookID column, nor an accessToken column
		// let userResult = await knex('users').where({facebookID: profile.id});
		// if(userResult === 0) {
		// 	console.log(profile, accessToken)
		// 	let user = {
		// 		facebookID: profile.id,
		// 		email: profile.displayName,
		// 		accessToken: accessToken
		// 	}
		// 	let query = await knex('users').insert(user).returning('id');

		// 	user.id = query[0];
		// 	done(null,user);
		// } else {
		// 	done(null, userResult[0])
		// }

		return done(null,{profile:profile,accessToken:accessToken});	
      
    }
	));

	passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser((user,done)=>{
    done(null,user);
  });
}