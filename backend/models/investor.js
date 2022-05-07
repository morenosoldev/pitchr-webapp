'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Investor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {foreignKey: 'user_id',targetKey: 'id'})
      this.hasMany(models.Market, {foreignKey: 'user_id'});
      this.hasMany(models.Industry, {foreignKey: 'user_id'});
      this.hasMany(models.PreviousInvestment, {foreignKey: 'user_id'});
      this.hasMany(models.InvestmentInterest, {foreignKey: 'user_id'});
      this.hasMany(models.Competence, {foreignKey: 'user_id'});

    }
  };
  Investor.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    investor_experience: DataTypes.INTEGER,
    investor_type: DataTypes.STRING,
    available_capital: DataTypes.INTEGER,
    public: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Investor',
  });
  return Investor;
};