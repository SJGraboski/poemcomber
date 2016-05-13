/* connection.js
 *  -Sync to a local/remote db
 * =========================== */

// Dependencies
var Seqeulize = require('sequelize');

// source: obj containing our connections
var source = {
	localhost: {
		port: 3306,
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'poem-comb'
	},

	jawsDB: {
		port: 3306,
		host: 'l9dwvv6j64hlhpul.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
		user: 'dplacwrhqlz1zbqc',
		password: 'pedoe8xesw36wmx8',
		database: 'jn5fe1k9jdm48o63'
	}
}

// Select a connection
var bonafide = source.localhost;

// create the MySQL connection with Sequelize
var sequelize = new Sequelize(bonafide.database, bonafide.user, bonafide.password, {
	host: bonafide.host,
	dialect: 'mysql',

	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},

});

// Exports the connection for other files
module.exports = sequelize;