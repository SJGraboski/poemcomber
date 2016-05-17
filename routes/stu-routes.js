// require path
var path = require('path');

// test if user is student
function stuTest(req, inst) {
	if(req.decoded.role == 'student') {
		return true;
	}
	if (inst && req.decoded.role == 'student') {
		return true;
	}
	else {
		return false;
	}
}

module.exports = function(app) {
	app.get('/student', function(req, res){
		if (stuTest(req, false)) {
			res.sendFile(path.join(__dirname + '/../view/student.html'));
		}
		else{
			res.sendFile(path.join(__dirname + '/../views/login.html'))
		}
	});

	app.get('/comments/:id', function(req, res){
		if (stuTest(req, true)) {
			res.sendFile(path.join(__dirname + '/../view/comments.html'));
		}
		else{
			res.sendFile(path.join(__dirname + '/../views/login.html'));
		}
	});
}
