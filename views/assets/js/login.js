function login(register){
	// grab the data for logging in
	debugger;
	if (register){
		var data = {
			username: $('#reg_username').val().trim(),
			password: $('#reg_password').val().trim(),
			instructor: $('#reg_instructor').val().trim()
		}
	} else {
		var data = {
			username: $('#log_username').val().trim(),
			password: $('#log_password').val().trim()
		}
	}
	debugger;
	// validates
	if (data.username == "" || data.password == "") {
		alert("You didn't enter a username or password!");
		return false;
	}

	if (register) {
		if (data.instructor == ""){
			alert("You didn't enter an instructor");
			return false;
		}
	}
	// Grab the URL of the website
	var currentURL = window.location.origin;
	// register
	if (register) {
		$.post(currentURL + '/api/register', data, function(result){
			window.location.replace("/overview");
			return false;
		})
	}
	// login
	else {
		$.post(currentURL + '/api/login', data, function(result){
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
	debugger;
	login(false);
	return false;
})

$(document).on("click", "#register", function(){
	debugger;
	login(true);
	return false;
})