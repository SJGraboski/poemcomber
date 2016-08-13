function login(register){
	// grab the data for logging in
	if (register){
		var data = {
			username: $('#reg_username').val().trim(),
			password: $('#reg_password').val().trim(),
		}
	} else {
		var data = {
			username: $('#log_username').val().trim(),
			password: $('#log_password').val().trim()
		}
	}
	// validate that something is there
	if (data.username == "" || data.password == "") {
		alert("You didn't enter a username or password!");
		return false;
	}
	// validate that the password length is more than 6 when registering
	else if (data.password.length < 6 && register) {
		alert("Your password must be more than 6 chars");
		return false;
	}
	// Grab the URL of the website
	var currentURL = window.location.origin;
	// register
	if (register) {
		$.post(currentURL + '/api/register', data, function(result){
			// send them to overview
			window.location.replace("/overview");
			return false;
		})
	}
	// login
	else {
		$.post(currentURL + '/api/login', data, function(result){
			// send them to overvier
			window.location.replace("/overview");
			return false;
		})
	}
	// redirect to overview
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