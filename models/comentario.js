const {sequelize} = require('../config/pg_config.js')
const {DataTypes} = require('sequelize');
const { User } = require('./users.js');

const Comentario = sequelize.define('Comentario', {
	id:{
		type:DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		
	},
    user_id:{
		type:DataTypes.INTEGER,
		allowNull:false,
		references:{
			model:User,
			key: 'id',
		}
	},
	name:{
		type:DataTypes.STRING,
		allowNull:false,
		unique:true,
		
	},
	coment:{
		type:DataTypes.STRING,
		allowNull:true
	},
  
	
},{tableName:"comentario"})

try{
	Comentario.sync({alter:true});
}catch(e){
	console.log(e)
}

module.exports={
	Comentario
}