/* Api routes 
 * ========== */
 // require express
var jwt = require('jsonwebtoken');
// require file seeker
var fs = require('fs');
//require path
var path = require('path');

// require the models
var Users = require('../model/user.js');
var Comments = require('../model/comments.js');
var Assignments = require('../model/assignments.js');

/* -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
    FOR EVERY USER API ROUTE, MAKE SURE YOU USE req.decoded
 * -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
 This is the decoded cookie retrieved in auth-routes */

// test route
module.exports = function(app) {
	app.get('/api/test', function(req, res) {
		res.json(req.decoded);
	})

	// post poem
	app.post('/api/postpoem', function(req, res){
		// get the user info
		var user = req.decoded;
		// grab the poem data
		poem = req.body;

		// save filename
		var filename = poem.title;

		// make container to put filedir into
		var filedir = "";

		// make a function for saving the info into the database
		function poemMaker(theRoute) {
			Assignments.create({
				textfileroute: theRoute,
				title: poem.title,
				summary: poem.summary,
				author: poem.author,
				instructor: user.username // "instructor's name"
			}).then(function(){
				Users.update({
					updatedAt: new Date()
				},{
					where: {id : user.id}
				})
			}).catch(function(err){
				console.log(err);
				if (err) throw err;
			})
		}

		// check if it exists already in the poems folder
		fs.stat(path.join(__dirname + "/../poems/" + filename + ".txt"), function(err, stats){
			// if it IS a file
			if(err == null) {
				console.log("File found!");
				// make a while to check for nums
				var counter = false;
				var i = 1;
				while(!counter) {
					console.log("ok");
					// try this
					try {
						// look for apropos file (synchronous to work with while loop)
						var fileStats = fs.statSync(path.join(__dirname + "/../poems/" + filename + "(" + i + ").txt"));
						console.log("That's a file");
						i++;
					// if that's not yet a file
					} catch(err) {
						if (err.code == 'ENOENT') {
							// then try this
							try {
								// write the file
								fs.writeFileSync(path.join(__dirname + "/../poems/" + filename + "(" + i + ").txt"), poem.excerpt);
								// save filedir so we have the file for sql
								filedir = "/../poems/" + filename + "(" + i + ").txt";
								// create the entry in the database
								poemMaker(filedir);
								// switch the counter on
								counter = true;
							} catch(err) {
								throw err;
							}
						}
						else {
							throw err;
						}
					}
				}
			}
			// if it's not a file
			else if(err.code == "ENOENT"){
				console.log("No File Found!");
				// write the file
				fs.writeFile(path.join(__dirname + "/../poems/" + filename + ".txt"), poem.excerpt, function(err){
					if (err) throw err;
					// save filedir so we have the file for sql
					filedir = "/../poems/" + filename + ".txt";
					// create the entry in the database
					poemMaker(filedir);
				})
			}
			else {
				console.log("Error submitting file: " + err);
			}
		})
	})
}
