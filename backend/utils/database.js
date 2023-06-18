const Sequelize = require("sequelize");
//const db_config = require("../db_config");

const sequelize = new Sequelize("pitchr", "root", "Moreno92100.221", {
  dialect: "mysql",
  host: "127.0.0.1",
  port: 3306,
});

module.exports = sequelize;
