'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Business,{foreignKey: 'user_id'});
    }
  };
  File.init({
    fileName: DataTypes.STRING,
    fileType: DataTypes.STRING,
    type: DataTypes.STRING,
    fileSize: DataTypes.INTEGER,
    fileUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'File',
  });
  return File;
};