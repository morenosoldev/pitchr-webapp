const models = require("../models");
const User = models.User;
const Chat = models.Chat;
const ChatUser = models.ChatUser;
const Message = models.Message;
const sequelize = require("../utils/database");
const { Op } = require("sequelize");

const getChatsFromUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.user.email,
      },
      include: [
        {
          model: Chat,
          include: [
            {
              model: User,
              where: {
                [Op.not]: {
                  email: req.user.email,
                },
              },
            },
            {
              model: Message,
              limit: 20,
              order: [["id", "DESC"]],
            },
          ],
        },
      ],
    });

    if (!user?.Chats || user?.Chats.length === 0) {
      // No chats found
      res.status(200).json([]);
    } else {
      res.status(200).json(user.Chats);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const create = async (req, res) => {
  const { partnerId } = req.body;

  const t = await sequelize.transaction();

  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      include: [
        {
          model: Chat,
          where: {
            type: "dual",
          },
          include: [
            {
              model: ChatUser,
              where: {
                userId: partnerId,
              },
            },
          ],
        },
      ],
    });

    if (user && user.Chats.length > 0)
      return res.status(403).json({
        status: "Error",
        message: "Chat with this user already exists!",
      });

    const chat = await Chat.create({ type: "dual" }, { transaction: t });

    await ChatUser.bulkCreate(
      [
        {
          chatId: chat.id,
          userId: req.user.id,
        },
        {
          chatId: chat.id,
          userId: partnerId,
        },
      ],
      { transaction: t }
    );

    await t.commit();

    // const chatNew = await Chat.findOne({
    //     where: {
    //         id: chat.id
    //     },
    //     include: [
    //         {
    //             model: User,
    //             where: {
    //                 [Op.not]: {
    //                     id: req.user.id
    //                 }
    //             }
    //         },
    //         {
    //             model: Message
    //         }
    //     ]
    // })

    const creator = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    const partner = await User.findOne({
      where: {
        id: partnerId,
      },
    });

    const forCreator = {
      id: chat.id,
      type: "dual",
      Users: [partner],
      Messages: [],
    };

    const forReceiver = {
      id: chat.id,
      type: "dual",
      Users: [creator],
      Messages: [],
    };

    return res.json([forCreator, forReceiver]);
  } catch (e) {
    await t.rollback();
    return res.status(500).json({ status: "Error", message: e.message });
  }
};

const messages = async (req, res) => {
  const limit = 10;
  const page = req.query.page || 1;
  const offset = page > 1 ? page * limit : 0;

  const messages = await Message.findAndCountAll({
    where: {
      chatId: req.query.id,
    },
    include: [
      {
        model: User,
      },
    ],
    limit,
    offset,
    order: [["id", "DESC"]],
  });

  const totalPages = Math.ceil(messages.count / limit);

  if (page > totalPages) return res.json({ data: { messages: [] } });

  const result = {
    messages: messages.rows,
    pagination: {
      page,
      totalPages,
    },
  };

  return res.json(result);
};

const addUserToGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    const chat = await Chat.findOne({
      where: {
        id: chatId,
      },
      include: [
        {
          model: User,
        },
        {
          model: Message,
          include: [
            {
              model: User,
            },
          ],
          limit: 20,
          order: [["id", "DESC"]],
        },
      ],
    });

    chat.Messages.reverse();

    // check if already in the group
    chat.Users.forEach((user) => {
      if (user.id === userId) {
        return res.status(403).json({ message: "User already in the group!" });
      }
    });

    await ChatUser.create({ chatId, userId });

    const newChatter = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (chat.type === "dual") {
      chat.type = "group";
      chat.save();
    }

    return res.json({ chat, newChatter });
  } catch (e) {
    return res.status(500).json({ status: "Error", message: e.message });
  }
};

const deleteChat = async (req, res) => {
  const { id } = req.params;

  try {
    const chat = await Chat.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
        },
      ],
    });

    const notifyUsers = chat.Users.map((user) => user.id);

    await chat.destroy();
    return res.json({ chatId: id, notifyUsers });
  } catch (e) {
    return res.status(500).json({ status: "Error", message: e.message });
  }
};

const leaveCurrentChat = async (req, res) => {
  try {
    const { chatId } = req.body;
    const chat = await Chat.findOne({
      where: {
        id: chatId,
      },
      include: [
        {
          model: User,
        },
      ],
    });

    if (chat.Users.length === 2) {
      return res
        .status(403)
        .json({ status: "Error", message: "You cannot leave this chat" });
    }

    if (chat.Users.length === 3) {
      chat.type = "dual";
      chat.save();
    }

    await ChatUser.destroy({
      where: {
        chatId,
        userId: req.user.id,
      },
    });

    await Message.destroy({
      where: {
        chatId,
        fromUserId: req.user.id,
      },
    });

    const notifyUsers = chat.Users.map((user) => user.id);

    return res.json({
      chatId: chat.id,
      userId: req.user.id,
      currentUserId: req.user.id,
      notifyUsers,
    });
  } catch (e) {
    return res.status(500).json({ status: "Error", message: e.message });
  }
};

module.exports = {
  getChatsFromUser,
  leaveCurrentChat,
  deleteChat,
  addUserToGroup,
  messages,
  create,
};
