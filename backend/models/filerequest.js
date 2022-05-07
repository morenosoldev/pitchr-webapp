'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class filerequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  filerequest.init({
    user_id: DataTypes.INTEGER,
    request_user_id: DataTypes.INTEGER,
    user_email: DataTypes.STRING,
    request_email: DataTypes.STRING,
    token: DataTypes.TEXT,
    access: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'filerequest',
  });
  return filerequest;
};