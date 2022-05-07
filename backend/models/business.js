'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Business extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Pitch, {foreignKey: 'user_id'});
      this.hasMany(models.File, {foreignKey: 'user_id'});
      this.hasMany(models.Metric, {foreignKey: 'userId'});
      this.belongsTo(models.User, {foreignKey: 'user_id',targetKey: 'id'})
      this.hasOne(models.PitchDeck, {foreignKey: "userId"})
      this.hasMany(models.Market, {foreignKey: 'user_id'});
      this.hasMany(models.Section, {foreignKey: 'userId'});
      this.hasMany(models.Industry, {foreignKey: 'user_id'});
      this.hasMany(models.Employee, {as: "employees"});
      this.hasMany(models.Competence, {as: "competences",foreignKey: "user_id"});
    }
  };
  Business.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    cvr: DataTypes.INTEGER,
    industry: DataTypes.STRING,
    goal: DataTypes.STRING,
    calendly:DataTypes.STRING,
    location: DataTypes.STRING,
    percentage: DataTypes.INTEGER,
    development_stage: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Business',
  });
  return Business;
};