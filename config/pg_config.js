
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('JorgeDataBase', 'postgres', '123', {
  host: 'localhost',
  schema: 'public',
  dialect: 'postgres',
});

module.exports = {
	sequelize
}