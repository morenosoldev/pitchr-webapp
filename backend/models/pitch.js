'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pitch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Business);
    }
  };
  Pitch.init({
    videoUrl: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    companyName: DataTypes.STRING,
    companyLogo: DataTypes.STRING,
    loom: DataTypes.STRING,
    fileSize: DataTypes.INTEGER,
    pitchDeck: DataTypes.STRING,
    calendly: DataTypes.STRING,
    fileName:DataTypes.STRING,
    type:DataTypes.STRING,
    views: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pitch',
  });
  return Pitch;
};