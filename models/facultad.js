const {sequelize} = require('../config/pg_config.js')
const {DataTypes} = require('sequelize');

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
Facultad.hasMany(Tesis, {foreignKey : 'tutor_id'})
try{
	Facultad.sync({alter:true});
}catch(e){
	console.log(e)
}

module.exports={
	Facultad
}