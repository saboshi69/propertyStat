
function searchinit() {
	let input = document.getElementById('locationName');
	let autocomplete = new google.maps.places.Autocomplete(input);
}
google.maps.event.addDomListener(window, 'load', searchinit);



async function searchByAutofill (){
	let input = document.getElementById('locationName');
	let add = input.value
	let json = await axios.post("/searchGeo", add)
	return JSON.parse(json.data)
}

let searchBar = document.querySelector ('#letssearch')
searchBar.addEventListener("click", async ()=>{
	let data = await searchByAutofill();
	console.log('data' + JSON.stringify(data[0]));

	processSearchData(data);

	// createColumm(data);
})
