'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class savedPitch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  };
  savedPitch.init({
    pitchID: DataTypes.INTEGER,
    investorID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'savedPitch',
  });
  return savedPitch;
};