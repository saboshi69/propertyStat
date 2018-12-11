


document.querySelector("#login").addEventListener("click", (e) => {
	e.preventDefault();
	window.location = "/login"
})
document.querySelector("#register").addEventListener("click", (e) => {
	e.preventDefault();
	window.location = "/register"
})
document.querySelector("#errRedirect").addEventListener("click", (e)=>{
	e.preventDefault();
	window.location = "/login"
})

