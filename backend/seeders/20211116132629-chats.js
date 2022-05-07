'use strict';
const models = require('../models');
const User = models.User;
const Chat = models.Chat;
const ChatUser = models.ChatUser;
const Message = models.Message;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

   const users = await User.findAll({raw:true})

   const chat = await Chat.create();

   const secondChat = await Chat.create();

   await ChatUser.bulkCreate([
     {
       chatId: chat.id,
       userId: users[4].id
     },
     {
       chatId: chat.id,
       userId: users[2].id
     },
     {
      chatId: secondChat.id,
      userId: users[1].id
    },
    {
      chatId: secondChat.id,
      userId: users[3].id
    }
   ])
/*
   await Message.bulkCreate([
     {
       message: "Hello Frederik",
       chatId:chat.id,
       fromUserId: users[2].id,
       profile_pic: 'https://rasmussentravel.dk/wp-content/uploads/2017/11/Peru-2014-1-02-Cusco-1-50-crop-h1000.jpg'
     },
     {
      message: "Hello Andre",
      chatId:chat.id,
      fromUserId: users[3].id,
      profile_pic: 'https://firebasestorage.googleapis.com/v0/b/pitchr-d3d71.appspot.com/o/images%2F1594806122192.jpg?alt=media&token=b62e5d42-13e2-48b0-ac59-ceeb904aa36d'
    }
   ])
*/
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
