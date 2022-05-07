const Sequelize = require('sequelize');
const db_config = require('../db_config');

const sequelize = new Sequelize(db_config.DB_DATABASE, db_config.DB_USER, db_config.DB_PASSWORD, {
    dialect: 'mysql',
    host:"pitchrdb.cm71rjbsbgvg.us-east-2.rds.amazonaws.com", 
    port:3306,
});



module.exports = sequelize;