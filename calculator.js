var LoanCalc = require('loan-calc');

LoanCalc.paymentCalc({
    amount: 200000,  // this is the price of house
    rate: 5,         // interest rate
    termMonths: 180  // how many months.
});
// returns 1581.59


module.exports = function(app) {
	app.get('/calculator', function(req, res) {
    res.render('calculator');
	});

	app.post('/calculator', function(req, res) {
		let price = req.body.price;
		let rate = req.body.interest_rate;
		let month = req.body.month;
		
		let result = LoanCalc.paymentCalc({
		    amount: price,  // this is the price of house
		    rate: rate,         // interest rate
		    termMonths: month  // how many months.
		});
	
		res.render('calculator', {result});

	})

}


