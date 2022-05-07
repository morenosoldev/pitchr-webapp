'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    this.hasOne(models.Video,{as: 'content',foreignKey: 'deckId'});
    this.belongsTo(models.Section,{as: 'subItems',foreignKey: 'sectionId'});
    }
  };
  Deck.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    index: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Deck',
  });
  return Deck;
};