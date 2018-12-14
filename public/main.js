

if(document.querySelector("#login")){
	document.querySelector("#login").addEventListener("click", (e) => {
		e.preventDefault();
		window.location = "/login"
	})
}


if(document.querySelector("#calculator")) {
	document.querySelector("#calculator").addEventListener("click", (e) => {
		e.preventDefault();
		console.log("clicked")
		window.location = "/calculator"
	})
}

if(document.querySelector("#register")) {
	document.querySelector("#register").addEventListener("click", (e) => {
		e.preventDefault();
		window.location = "/register"
	})
}

// if(document.querySelector("#subRegister")) {
// 	document.querySelector("#subRegister").addEventListener("click", (e) => {
// 		e.preventDefault();
// 		window.location = "/login"
// 	})
// }


if (document.querySelector("#errRedirect")) {
	document.querySelector("#errRedirect").addEventListener("click", (e)=>{
		e.preventDefault();
		window.location = "/login"
	})	
}

if(document.querySelector(".chartH")){
	document.querySelector(".chartH").addEventListener("click", (e)=>{
		e.preventDefault();
		document.querySelector("#cHistogram").style.display = "flex";
		document.querySelector("#cCandle").style.display = "none";
	})
}

if(document.querySelector(".chartC")){
	document.querySelector(".chartC").addEventListener("click", (e)=>{
		e.preventDefault();
		document.querySelector("#cHistogram").style.display = "none";
		document.querySelector("#cCandle").style.display = "flex";
	})
}


$("#mapButton").on("click", function(e) {
	$("#chartArea").hide();
	$("#mapArea").show();
});

$("#chartButton").on("click", function(e) {
	$("#mapArea").hide();
	$("#chartArea").show();
});

