function searchinit() {
	let input = document.getElementById('locationName');
	let autocomplete = new google.maps.places.Autocomplete(input);
}
google.maps.event.addDomListener(window, 'load', searchinit);


