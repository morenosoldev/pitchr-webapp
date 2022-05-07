'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    //this.belongsToMany(models.Chat, {through:'ChatUser', foreignKey:'userId'})
    //this.hasMany(models.ChatUser, {foreignKey: 'userId'})
    //this.hasOne(models.Investor, {foreignKey: 'user_id'})
    this.hasOne(models.Business, {foreignKey: 'user_id', targetKey: 'id'})
    }
  };
  User.init({
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.STRING,
    profile_pic: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};