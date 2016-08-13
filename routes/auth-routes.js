/* Auth Routes:
 * Handles all log-in and registration attempts
 * ============================================ */

// dependencies
var jwt = require('jsonwebtoken');
var Cookies = require('cookies');
var bcrypt = require('bcrypt');
var validator = require('validator')

// bring in apropos models
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
        
        // grab username and password from form
        var username = req.body.username;
        var password = req.body.password;

        // find user by searching for username and password
        Users.findOne({
            where: {
                username: username
            }
        })
        // use the info in the next function
        .then(function(result){ 

            // first, make sure the passwords match
            bcrypt.compare(password, result.dataValues.password, function(err, passRes) {
                if (err) throw err;
                // if the pw doesn't match, send an error
                if (passRes === false) {
                    res.status(403).json("{'error':'password doesn't match}");
                }
                // otherwise, proceed
                else {
                    // then save the result as the user obj
                    var user = {
                        username: result.dataValues.username,
                        role: result.dataValues.role,
                        instructorName: result.dataValues.instructorName
                    };
                    // save a token
                    var token = jwt.sign(user, app.get('jwtSecret'), {
                        expiresIn: 86400 // Token is given but will expire in 24 hours
                    });

                    // make a new cookie, save the token to it. This gets saved to the client
                    new Cookies(req, res).set('access_token', token, {
                        httpOnly: true,
                        secure: false
                    });

                    // Then send success message with token
                    res.json({
                        success: true,
                        message: "Access granted.",
                        token: token
                    });
                }
            })
        })
        // but if there's an error with sequelize function,
        .catch(function(err) { 
            // send an error message
            res.status(403).json("{'error':'" + err + "'");
        })
    });



    // register post for students
    app.post('/api/register', function(req, res){

        // grab username and password from form
        var username = req.body.username;
        var password = req.body.password;

        // validate data
        if (!validator.isLength(username, {min: 2, max: undefined}) || !validator.isLength(password, {min: 6, max: undefined})){
            // if data isn't valid, don't accept it
            res.status(403).json("{'error':'bad pass or username'");
        }
        else {

            // bcrypt hashing
            const saltRounds = 10;

            // hash the password
            bcrypt.hash(password, saltRounds, function(err, hash){
                // throw any errors
                if (err) throw error; 

                // insert sequelize here to grab the username, hash,
                // role and latest from database
                Users.create({
                        username: username,
                        password: hash,
                        role: "student",
                        instructorName: "Instructor"
                })
                // after creating the user, grab the result for our web token
                .then(function(result){
                    // get the right user data from the result
                    var user = {
                        username: result.dataValues.username,
                        role: result.dataValues.role,
                        instructorName: result.dataValues.instructorName
                    };

                    // create JSON token
                    var token = jwt.sign(user, app.get('jwtSecret'), {
                        expiresIn: 86400 // Token is given but will expire in 24 hours (requiring a re-login)
                    });

                    // create new cookie and log user in
                    new Cookies(req, res).set('access_token', token, {
                        httpOnly: true,
                        secure: false
                    });

                    // Then send it to the user. This token will need to be used to access the API
                    res.json({
                        success: true,
                        message: "Access granted.",
                        token: token
                    });

                }).catch(function(err) {
                    // log errors
                    console.log(err);
                    // send error message
                    res.status(403).json("{'error':'" + err + "'");
                })
            })
        }

    })



    // logout function
    app.get("/api/logout", function(req, res){
        // this simple command grabs the access token cookie, then deletes it.
        new Cookies(req, res).set('access_token');
        // send success to ajax
        res.status(200).end();
    })

    // the all command
    app.all('*', function(req, res, next){

        // grab the token from the cookie
        var token = new Cookies(req, res).get('access_token');

        // verify the token
        jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
            if (err) {
                // return error if there is one
                return res.json({success: false, message: "access denied"})
            }
            else {
                // save the cookie to our req for the next parts in our routing
                req.decoded = decoded;
                // move to the next routes
                next();
            }
        })
    })
}