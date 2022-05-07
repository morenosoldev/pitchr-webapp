'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //this.hasOne(models.User,{foreignKey: 'user_id',targetKey: 'id'})
    }
  };
  UserTypes.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserTypes',
  });
  return UserTypes;
};