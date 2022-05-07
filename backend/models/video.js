'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Deck, {
        as: 'content',
        foreignKey: {name:'deckId',allowNull:false}
      });
    }
  };
  Video.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    duration: DataTypes.STRING,
    type: DataTypes.STRING,
    video: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};