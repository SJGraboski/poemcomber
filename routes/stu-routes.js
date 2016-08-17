// paths to pages students can access

// require path
var path = require('path');

// function to test if user is student
function stuTest(req, inst) {
	if(req.decoded.role == 'student') {
		return true;
	}
	// are they an instructor
	if (inst && req.decoded.role == 'instructor') {
		return true;
	}
	else {
		// if neither, return false
		return false;
	}
}

// display overview for students
module.exports = function(app) {
	app.get('/overview', function(req, res){
		// if student
		if (stuTest(req, false)) {
			// give student overview
			res.sendFile(path.join(__dirname + '/../views/student.html'));
		}
		// if instructor
		else if (stuTest(req, true)){
			// give instructor overview
			res.sendFile(path.join(__dirname + '/../views/instructor.html'))
		}
		// if neither
		else{
			// send them home
			res.sendFile(path.join(__dirname + '/../views/login.html'));
		}
	});

	// for comments page
	app.get('/comments/:id', function(req, res){
		// whether instructor or student
		if (stuTest(req, true)) {
			// show comments
			res.sendFile(path.join(__dirname + '/../views/comments.html'));
		}
		// otherwise
		else{
			// show splash page
			res.sendFile(path.join(__dirname + '/../views/login.html'));
		}
	});
}
