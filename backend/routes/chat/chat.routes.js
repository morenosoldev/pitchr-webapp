const {getChatsFromUser, messages, create, addUserToGroup, leaveCurrentChat, deleteChat} = require('../../controllers/chat.js')
const {auth} = require('../../middleware/auth');

module.exports = function(app){
app.get('/chats',[auth], getChatsFromUser)
app.get('/messages',[auth], messages)
app.post('/chats/create',[auth], create)
app.post('/add-user-to-group',[auth], addUserToGroup)
app.post('/leave-current-chat', [auth],leaveCurrentChat)
app.delete('/:id',[auth],deleteChat)
}

