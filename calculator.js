var LoanCalc = require('loan-calc');

module.exports = function(app) {
	app.get('/calculator', function(req, res) {
    res.render('calculator');
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


