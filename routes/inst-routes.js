// paths for instructor sites

// require path
var path = require('path');

// test if user is instructor
function instTest(req) {
	if(req.decoded.role == 'instructor') {
		return true;
	}
	else {
		return false;
	}
}

// export the urls
module.exports = function(app){

	// post poem
	app.get('/postpoem', function(req, res) {
		// if user is instructor
		if (instTest(req)) {
			// let them post poems
			res.sendFile(path.join(__dirname + '/../views/postpoem.html'))
		}
		else {
			// otherwise throw the login page at them
			res.sendFile(path.join(__dirname + '/../views/login.html'))
		}
	})
}