const {sequelize} = require('../config/pg_config.js')
const {DataTypes} = require('sequelize');
const { Tesis } = require('./tesis.js');

const Facultad = sequelize.define('Facultad', {
	id:{
		type:DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		
	},
	name:{
		type:DataTypes.STRING,
		allowNull:false,
		unique:true,
		
	},
},{tableName:"facultad"})

module.exports={
	Facultad
}