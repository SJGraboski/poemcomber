// logout function
function logout() {
	$.get("/logout", function(){
		window.location.replace("/overview");
	})
}

// call 
$(document).on("click", "#logout", function(){
	logout();
})