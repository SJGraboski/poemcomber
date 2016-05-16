var Sequelize = require("sequelize"); 
var sequelize = require("../config/connection.js");


var Comments = sequelize.define("comments", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	foreignAssignment: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	foreignUser: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	comment:{
		type: Sequelize.STRING(4000),
		allowNull: false
	},
	startingLine:{
		type: Sequelize.INTEGER,
		allowNull: false
	},
	endingLine:{
		type: Sequelize.INTEGER,
		allowNull: false
	}
});


Comments.sync();

module.exports = Comments;