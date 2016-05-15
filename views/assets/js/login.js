function login(register){
	// grab the data for logging in

	if (register){
		var data = {
			username: $('#reg_username').val().trim(),
			password: $('#reg_password').val().trim()
		}
	} else {
		var data = {
			username: $('#log_username').val().trim(),
			password: $('#log_password').val().trim()
		}
	}
	// validates
	if (!data.username || !data.password) {
		alert("You didn't enter a username or password!")
	}
	// Grab the URL of the website
	var currentURL = window.location.origin;
	// register
	if (register) {
		$.post(currentURL + '/api/register', data, function(result){
			console.log(result);
			return false;
		})
	}
	// login
	else {
		$.post(currentURL + '/api/login', data, function(result){
			console.log(result);
			return false;
		})
	}
	return false;
}

// calls
// when you click the login button
$(document).on("click", "#login", function(){
	login(false);
	return false;
})

$(document).on("click", "#register", function(){
	login(true);
	return false;
})