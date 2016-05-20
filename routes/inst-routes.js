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

	app.get('/postpoem', function(req, res) {
		if (instTest(req)) {
			res.sendFile(path.join(__dirname + '/../views/postpoem.html'))
		}
		else {
			res.sendFile(path.join(__dirname + '/../views/login.html'))
		}
	})

	app.get('/postpoem.html', function(req, res) {
		if (instTest(req)) {
			res.sendFile(path.join(__dirname + '/../views/postpoem.html'))
		}
		else {
			res.sendFile(path.join(__dirname + '/../views/login.html'))
		}
	})
}