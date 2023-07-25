const {sequelize} = require('../config/pg_config.js')
const {DataTypes} = require('sequelize');
const { Tesis } = require('./tesis.js');

const Objetivo = sequelize.define('Objetivo', {
	id:{
		type:DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		
	},
	descripcion:{
		type:DataTypes.STRING,
		allowNull:false,
		unique:true
		
	},
    tipo_objetivo:{
		type:DataTypes.STRING,
		allowNull:false,
		
		
	},
    tesis_id:{
		type:DataTypes.INTEGER,
		allowNull:false,
		references:{
			model:Tesis,
			key: 'id',
		}
	},
},{tableName:"objetivo"})

try{
	Objetivo.sync({alter:true});
}catch(e){
	console.log(e)
}

module.exports={
	Objetivo
}