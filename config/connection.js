/* connection.js
 *  -Sync to a local/remote db
 * =========================== */

// Dependencies
var Sequelize = require('sequelize');


// determine which connection to use
var connection;

// if we have a jawsdb_url in our environment, use that
if (process.env.JAWSDB_URL) {
	connection = new Sequelize(process.env.JAWSDB_URL)
}
// otherwise, use our local database
else {
	connection = new Sequelize('todo_db', 'root', 'password', {
		host: 'localhost',
		dialect: 'mysql',
		port: '3306'
	})
}

// Exports the connection for other files
module.exports = sequelize;