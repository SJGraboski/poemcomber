// require Sequelize
var Sequelize = require('sequelize');
// make sequelize object using connection export
var sequelize = require('../config/connection.js');

// make user model 
var User = sequelize.define("user", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: true,
		unique: true
	},
	username: {
		type: Sequelize.STRING,
		allowNull: true,
		unique: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: true
	},
	role: {
		type: Sequelize.STRING
	}
})

// sync with DB
User.sync();

// export it!
module.exports = User;