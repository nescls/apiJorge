const {sequelize} = require('../config/pg_config.js')
const {DataTypes} = require('sequelize');
const { Tesis } = require('./tesis.js');

const Escuela = sequelize.define('Escuela', {
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
},{tableName:"escuela"})


module.exports={
	Escuela
}