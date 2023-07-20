const {sequelize} = require('../config/pg_config.js')
const {DataTypes} = require('sequelize');
const { Tutor } = require('./tutor.js');

const DisponibilidadTutor = sequelize.define('DisponibilidadTutor', {
	id:{
		type:DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		
	},
	dias:{
		type:DataTypes.STRING,
		allowNull:false,
		unique:true,
		
	},
    hora:{
		type:DataTypes.STRING,
		allowNull:false,
		unique:true,
	},
    turno:{
		type:DataTypes.STRING,
		allowNull:false,
		unique:true,
	},
    tutor_id:{
		type:DataTypes.INTEGER,
		allowNull:false,
		references:{
			model:Tutor,
			key: 'id',
		}
	},

},{tableName:"disponibilidadTutor"})

try{
	DisponibilidadTutor.sync({alter:true});
}catch(e){
	console.log(e)
}

module.exports={
	DisponibilidadTutor
}