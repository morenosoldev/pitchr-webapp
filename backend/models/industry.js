'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Industry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Investor)
    }
  };
  Industry.init({
    name: DataTypes.STRING,
    icon: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Industry',
  });
  return Industry;
};