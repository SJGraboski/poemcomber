// require path
var path = require('path');

// test if user is student
function stuTest(req, inst) {
	if(req.decoded.role == 'student') {
		return true;
	}
	if (inst && req.decoded.role == 'instructor') {
		return true;
	}
	else {
		return false;
	}
}

module.exports = function(app) {
	app.get('/overview', function(req, res){
		if (stuTest(req, false)) {
			res.sendFile(path.join(__dirname + '/../views/student.html'));
		}
		else if (stuTest(req, true)){
			res.sendFile(path.join(__dirname + '/../views/instructor.html'))
		}
		else{
			res.sendFile(path.join(__dirname + '/../views/login.html'));
		}
	});

	app.get('/comments/:id', function(req, res){
		console.log(req.decoded);
		if (stuTest(req, true)) {
			res.sendFile(path.join(__dirname + '/../views/comments.html'));
		}
		else{
			res.sendFile(path.join(__dirname + '/../views/login.html'));
		}
	});
}
