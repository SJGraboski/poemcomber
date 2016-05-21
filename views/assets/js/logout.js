// logout function
function logout() {
	$.get("/api/logout", function(){
		window.location.replace("/");
	})
}

// call 
$(document).on("click", "#logout", function(){
	logout();
})