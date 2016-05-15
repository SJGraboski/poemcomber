var Sequelize = require("sequelize"); 
var sequelize = require("../config/connection.js");

var Assignment = sequelize.define("assignments", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	textfileroute:{
		type: Sequelize.STRING,
		allowNull: false
	},
	title:{
		type: Sequelize.STRING,
		allowNull: false
	},
	summary:{
		type: Sequelize.STRING
	},
	instructor: {
		type: Sequelize.STRING
	}

});


Assignment.sync();

module.exports = Assignment ;