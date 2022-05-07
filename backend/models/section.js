'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    this.belongsTo(models.Business, {foreignKey: 'userId'})
    this.hasMany(models.Deck, {as: 'subItems', foreignKey: 'sectionId'});
    }
  };
  Section.init({
    id: {
    type:DataTypes.INTEGER,
    primaryKey:true,
    },
    title: DataTypes.STRING,
    index: DataTypes.INTEGER,
    public: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Section',
  });
  return Section;
};