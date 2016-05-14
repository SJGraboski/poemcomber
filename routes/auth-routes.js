/* Auth Routes:
 * Handles all log-in and registration attempts
 * ============================================ */

// dependencies
var jwt = require('jsonwebtoken');
var Cookies = require('cookies');

// bring in appropos models
var User = require('user');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){

	// API POST Requests
	// The code in here authenticates against the admin data. 
	// If a user exists in the admin list they are given an access "token"
	// Otherwise, they are denied access to the api route
	// ---------------------------------------------------------------------------

    // login post
	app.post('/api/login', function(req, res){

		var username = req.body.username;
		var password = req.body.password;

        // find user by searching for username and password
        User.findAll({
            where: {
                username: username,
                password: password
            }
        }).then(function(result){ // then save the result as the user obj
            var user = result;
            // create JSON token that includes the user info
            var token = jwt.sign(user, app.get('jwtSecret'), {
                expiresIn: 1440 // Token is given but will expire in 24 hours (requiring a re-login)
            });

            // send a cookie to the user with the proper info. 
            new Cookies(req, res).set('acces_token', token, {
                httpOnly: true,
                secure: false
            });

            // send response
            res.send("{'message':'Success! You're in!'")
        }).catch(function(err) {
            res.status(403).json("{'error':'" + err + "'");
        })
	});

    // register post for students
    app.post('/api/register', function(req, res){

        var username = req.body.username;
        var password = req.body.password;

        // insert sequelize here to grab the username, password, role and latest from database
        User.create({
                username: username,
                password: password,
                role: "student"
            }
        }).then(function(){ // and we log them in upon registration, same as above
            .User.findAll({
            where: {
                username: username,
                password: password
            }
            })
        }).then(function(result){
            var user = result;
            // create JSON token
            var token = jwt.sign(user, app.get('jwtSecret'), {
                expiresIn: 1440 // Token is given but will expire in 24 hours (requiring a re-login)
            });

            // send a cookie to the user with the proper info. 
            new Cookies(req, res).set('acces_token', token, {
                httpOnly: true,
                secure: false
            });

            // send response
            res.send("{'message':'Success! You're in!'")
        }).catch(function(err) {
            res.status(403).json("{'error':'" + err + "'");
        })
    });

}