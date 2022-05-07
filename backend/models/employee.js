'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Business, {foreignKey: 'BusinessUserId'})
    }
  };
  Employee.init({
    name: DataTypes.STRING,
    jobTitle: DataTypes.STRING,
    profilePic: DataTypes.STRING,
    equity: DataTypes.INTEGER,
    linkedIn: DataTypes.STRING,
    jobDescription: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};