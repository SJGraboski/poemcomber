/* Auth Routes:
 * Handles all log-in and registration attempts
 * ============================================ */

// dependencies
var jwt = require('jsonwebtoken');
var Cookies = require('cookies');

// bring in appropos models
var Users = require('../model/user.js');
var Comments = require('../model/comments.js');
var Assignments = require('../model/assignments.js');

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
        Users.findAll({
            where: {
                username: username,
                password: password
            }
        }).then(function(result){ // then save the result as the user obj
            var user = result[0].dataValues;
            // create JSON token
            var token = jwt.sign(user, app.get('jwtSecret'), {
                expiresIn: 1440 // Token is given but will expire in 24 hours (requiring a re-login)
            });

            new Cookies(req, res).set('access_token', token, {
                httpOnly: true,
                secure: false
            });

            // Then send it to the user. This token will need to be used to access the API
            res.json({
                success: true,
                message: "Access granted. Proceed to the holy gateway of our API. Just be sure to use the token!",
                token: token
            });
        }).catch(function(err) {
            res.status(403).json("{'error':'" + err + "'");
        })
    });

    // register post for students
    app.post('/api/register', function(req, res){

        var username = req.body.username;
        var password = req.body.password;

        // insert sequelize here to grab the username, password, role and latest from database
        Users.create({
                username: username,
                password: password,
                role: "student"
        }).then(function(result){
            console.log(result);
            var user = result.dataValues;
            console.log(user);
            // create JSON token
            var token = jwt.sign(user, app.get('jwtSecret'), {
                expiresIn: 1440 // Token is given but will expire in 24 hours (requiring a re-login)
            });

            new Cookies(req, res).set('access_token', token, {
                httpOnly: true,
                secure: false
            });
            // Then send it to the user. This token will need to be used to access the API
            res.json({
                success: true,
                message: "Access granted. Proceed to the holy gateway of our API. Just be sure to use the token!",
                token: token
            });
            // send response
            res.send("{'message':'Success! You're in!'")
        }).catch(function(err) {
            console.log(err);
            res.status(403).json("{'error':'" + err + "'");
        })
    })

    // the all command
    app.all('*', function(req, res, next){
        var token = new Cookies(req, res).get('access_token');
        console.log(token);
        // verify the token
        jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
            if (err) {
                console.log("Not yet");
                console.log(decoded)
                return res.json({success: false, message: "access denied"})
            }
            else {
                console.log("looks legit!")
                req.decoded = decoded;
                console.log(decoded);
                next();
            }
        })
    })
}