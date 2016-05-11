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
		host: 'insert remote db here',
		user: 'insert user here',
		password: 'insert password here',
		database: 'insert database here'
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