const {sequelize} = require('../config/pg_config.js')
const {DataTypes} = require('sequelize');
const { DisponibilidadTutor } = require('./disponibilidad_tutor.js');
const { Tesis } = require('./tesis.js');

const Tutor = sequelize.define('Tutor', {
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
    titulo:{
		type:DataTypes.STRING,
		allowNull:false,
		unique:true,
	},
},{tableName:"tutor"})

Tutor.hasMany(DisponibilidadTutor, {foreignKey : 'tutor_id'})
try{
	Tutor.sync({force:true});
}catch(e){
	console.log(e)
}

module.exports={
	Tutor
}