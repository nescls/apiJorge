const {sequelize} = require('../config/pg_config.js')
const {DataTypes} = require('sequelize');
const { Facultad } = require('../models/facultad.js');
const { Escuela } = require('../models/escuela.js');
const { Tutor } = require('./tutor.js');
const { Autores } = require('./autores.js');

const Tesis = sequelize.define('Tesis', {
	id:{
		type:DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		
	},
	idtesis:{
		type:DataTypes.STRING,
		allowNull:false,
		unique:true,
	},
	titulo:{
		type:DataTypes.STRING,
		allowNull:false,
		unique:true,
	},
	resumen:{
		type:DataTypes.STRING,
		allowNull:true
	},
    fecha_publicacion:{
		type:DataTypes.DATE,
		allowNull:true
	},
    codigoQr:{
		type:DataTypes.TEXT("long"),
		allowNull:true
	},
    estatus:{
		type:DataTypes.STRING,
		allowNull:true
	},
    tutor:{
		type:DataTypes.STRING,
		allowNull:true,
	},
    correo:{
		type:DataTypes.STRING,
		allowNull:false,
	},
    facultad_id:{
		type:DataTypes.INTEGER,
		allowNull:false,
		references:{
			model:Facultad,
			key: 'id',
		}
	},
    escuela_id:{
		type:DataTypes.INTEGER,
		allowNull:false,
		references:{
			model:Escuela,
			key: 'id',
		}
	},
},{tableName:"tesis"})

Tesis.hasMany(Autores, {foreignKey: "tesis_id"})

try{
	Tesis.sync({alter:true});
}catch(e){
	console.log(e)
}

module.exports={
	Tesis
}