const LoanCalc = require('loan-calc');
const dbGetUser = require("./dbEnquiry/dbGetUser")

module.exports = function(app) {
	app.get('/calculator', async (req, res) =>{
		
		if (req.session.passport) {
			let user = await dbGetUser(req.session.passport.user)
			res.render('calculator', {user: user});	
		} else {
			res.render('calculator');	
		}
		
    
	});

	app.post('/calculate', function(req, res) {

		let price =  Number(req.body.price);
		let interest_rate =  Number(req.body.interest_rate);
		let month =  Number(req.body.month);

		let result = LoanCalc.paymentCalc({
			amount: price,
			rate: interest_rate,
			termMonths: month
		});

		res.send(String(result));
	});
}


