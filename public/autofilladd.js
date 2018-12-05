
function searchinit() {
	let input = document.getElementById('locationName');
	let autocomplete = new google.maps.places.Autocomplete(input);
}
google.maps.event.addDomListener(window, 'load', searchinit);



async function searchByAutofill (){
	let input = document.getElementById('locationName');
	let add = input.value
	axios.post("/searchGeo", add)
	console.log(add)
}



let searchBar = document.querySelector ('#letssearch')
searchBar.addEventListener("click", ()=>{
	searchByAutofill()
})
