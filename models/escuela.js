const {sequelize} = require('../config/pg_config.js')
const {DataTypes} = require('sequelize');

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
Escuela.hasMany(Tesis, {foreignKey : 'tutor_id'});
try{
	Escuela.sync({alter:true});
}catch(e){
	console.log(e)
}

module.exports={
	Escuela
}