/* Api routes 
 * ========== */
 // require express
var jwt = require('jsonwebtoken');

/* -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
    FOR EVERY USER API ROUTE, YOU MUST CALL THIS FUNCTION
 * -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
    It checks whether the user is logged in
    and ensures that only instructors/students 
    can access their assigned pages
 ======================================================== */ 
function checkUser(callback){
	// get the user who logged in
	// 1: grab cookie (defined in auth-routes.js)
	var token  = new Cookies(req, res).get('acces_token');

	// now verify the token is a good one
	jwt.verify(token, app.get('jwtsecret'), function(err, decoded){

		// if you get an error, log the err
		if (err){
			console.log(err);
			return false;
		}
		// if not grab the info we need
		else{
			console.log()
			// place the decoded info in the callback
			callback(decoded);
		}
	})
}

// test route
module.exports = function(app) {
	app.get('/api/test', function(req, res) {
		res.json(req.decoded);
	})
}
