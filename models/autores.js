const {sequelize} = require('../config/pg_config.js')
const {DataTypes} = require('sequelize');
const { Tesis } = require('./tesis.js');

const Autores = sequelize.define('Autores', {
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
    apellido:{
		type:DataTypes.STRING,
		allowNull:true,
		unique:true,
		
	},
    cedula:{
		type:DataTypes.STRING,
		allowNull:true,
		unique:true,
	},
    tesis_id:{
		type:DataTypes.INTEGER,
		allowNull:false,
		references:{
			model:Tesis,
			key: 'id',
		}
	},
},{tableName:"autores"})

try{
	Autores.sync({alter:true});
}catch(e){
	console.log(e)
}

module.exports={
	Autores
}