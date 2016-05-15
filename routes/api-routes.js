/* Api routes 
 * ========== */
 // require express
var jwt = require('jsonwebtoken');

/* -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
    FOR EVERY USER API ROUTE, MAKE SURE YOU USE req.decoded
 * -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
 This is the decoded cookie retrieved in auth-routes */

// test route
module.exports = function(app) {
	app.get('/api/test', function(req, res) {
		res.json(req.decoded);
	})
}
