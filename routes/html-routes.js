/* poem comber html-routes.js
 * tells what index files to make
 * ============================== */
 // require express
var path = require('path');

module.exports = function(app){
	// home page is login/splash page
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname + '/../views/login.html'));
 })
};