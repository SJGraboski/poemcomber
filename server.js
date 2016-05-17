/* PoemComber
 * -Steve, Andrew, Zintis, Analben
 * =============================== */

// Dependencies
// ====================================
var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var path = require('path');
var sm = require('sitemap')
// Creates a sitemap object given the input configuration with URLs 
var sitemap = sm.createSitemap({ options });
// Generates XML with a callback function 
sitemap.toXML( function(xml){ console.log(xml) });
// Gives you a string containing the XML data 
var xml = sitemap.toString();

// Express App
// ====================================
var app = express();
var PORT = process.env.PORT || 8000;

// set json webtokensecret
app.set('jwtSecret', 'CODINGROCKr');

// bodyparser middleware for Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// set up static content
var staticContentFolder = __dirname + '/views';
console.log(staticContentFolder);
app.use(express.static(staticContentFolder));

// Make site map
// ===================================
app.get('/sitemap.xml', function(req, res) {
  res.header('Content-Type', 'application/xml');
  res.send( sitemap.toString() );
});

// App Routes
// ===================================
require('./routes/html-routes.js')(app);
require('./routes/auth-routes.js')(app);
require('./routes/inst-routes.js')(app);
require('./routes/stu-routes.js')(app);
require('./routes/api-routes.js')(app);

// Execute server
// ===================================
app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})