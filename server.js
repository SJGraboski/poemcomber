/* PoemComber
 * -Steve, Andrew, Zintis, Analben
 * =============================== */

// Dependencies
// ====================================
var express = require('express');
var bodyParser = require('body-parser')


// Express App
// ====================================
var app = express();
var PORT = process.env.PORT || 3000;

// bodyparser middleware for Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser,json({type:'application/vnd.api+json'}));


// App Routes
// ===================================
require("./routes/api-routes.js")(app)
require("./routes/html-routes.js")(app)

// Execute server
// ===================================
app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})