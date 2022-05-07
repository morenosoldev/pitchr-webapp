const Message = require("../models/Message");

//add

module.exports = createNewMessage = async (req, res) => {
  Message.create(({
    id: 1,
    type:"text",
    message: "lets gooo", 
    chatId: 7,
    fromUserId: 17,
    profile_pic: 'https://firebasestorage.googleapis.com/v0/b/pitchr-d3d71.app…92.JPEG?alt=media&token=033f761d-767b-4a90-8749-661f9ebdd470'
  }))
  .then(message => {
     res.status(200).json(message);
  })
  .catch(err => res.status(500).json(err))
};

//get

module.exports = getMessagesFromConversation = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

