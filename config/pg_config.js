
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('JorgeDataBase', 'postgres', 'admin', {
  host: 'localhost',
  schema: 'doyanoMartinez',
  dialect: 'postgres',
});

module.exports = {
	sequelize
}