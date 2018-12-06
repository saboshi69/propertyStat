$(function() {
	$('#calc').on('submit', function(event) {
		event.preventDefault();
		let data = $(this).serializeArray();
		
		$.ajax({
			url: '/calculate',
			method: 'POST',
			data: data,
			success: function(data) {
				$('#result').html(`<p>Your monthly instalment is ${data}.</p>`);
			}
		})
	});
});
