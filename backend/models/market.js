'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Market extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Investor, {foreignKey: 'user_id'})
    }
  };
  Market.init({
    name: DataTypes.STRING,
    icon: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Market',
  });
  return Market;
};