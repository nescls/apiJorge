const {sequelize} = require('../config/pg_config.js')
const {DataTypes} = require('sequelize');
const { Comentario } = require('./comentario.js');

const User = sequelize.define('User', {
	id:{
		type:DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		
	},
	id_number:{
		type:DataTypes.STRING,
		allowNull:false,
		unique:true,
		
	},
	telefono:{
		type:DataTypes.STRING,
		allowNull:true
	},
    correo:{
		type:DataTypes.STRING,
		allowNull:false
	},
	password:{
		type:DataTypes.STRING,
		allowNull:false
	},

	isActive:{
		type:DataTypes.BOOLEAN,
		allowNull:false
	},

	rol:{
		type:DataTypes.INTEGER,
		allowNull:false
	},

	refreshToken:{
		type:DataTypes.STRING,
		allowNull:true
	}
	
},{tableName:"user"})
User.hasMany(Comentario,{foreignKey: 'user_id'})
try{
	User.sync({alter:true});
}catch(e){
	console.log(e)
}

module.exports={
	User
}