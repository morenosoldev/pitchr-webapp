"use strict";
const models = require("../models");
const User = models.User;
const Chat = models.Chat;
const ChatUser = models.ChatUser;
const Message = models.Message;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll({ raw: true });

    const chat = await Chat.create();

    const secondChat = await Chat.create();

    await ChatUser.bulkCreate([
      {
        chatId: chat.id,
        userId: users[4].id,
      },
      {
        chatId: chat.id,
        userId: users[2].id,
      },
      {
        chatId: secondChat.id,
        userId: users[1].id,
      },
      {
        chatId: secondChat.id,
        userId: users[3].id,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
