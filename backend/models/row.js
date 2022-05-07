'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Row extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Metric, {as: 'rows',foreignKey: 'metricId'});
    }
  };
  Row.init({
    id: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    month: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    metricId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Row',
  });
  return Row;
};