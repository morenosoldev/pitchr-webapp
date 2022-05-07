'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Chat, {foreignKey: 'chatId'})
    }
  };
  Message.init({
    type: DataTypes.STRING,
    message: DataTypes.TEXT,
    chatId: DataTypes.INTEGER,
    fromUserId: DataTypes.INTEGER,
    profile_pic: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};