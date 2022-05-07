import config from '../../util/AxiosConfig';
import { history } from '../../util/history';

const ChatService = {

    fetchChats: () => {
        return config.get('/chats')
            .then(({ data }) => {
                return data
            })
            .catch(err => {
                throw err
            })
    },


    paginateMessages: (id, page) => {
        return config.get('/chats/messages', {
            params: {
                id, page
            }
        })
            .then(({ data }) => {
                return data
            })
            .catch(err => {
                throw err
            })
    },

    searchUsers: (term) => {
        return config.get('/users/search-users', {
            params: {
                term
            }
        })
            .then(({ data }) => {
                return data
            })
            .catch(err => {
                throw err
            })
    },

    createChat: (partnerId) => {
        return config.post('/chats/create', { partnerId })
            .then(({ data }) => {
                return data
            })
            .catch(err => {
                history.push("/investor/app/chat")
                throw err
            })
    },

    addFriendToGroupChat: (userId, chatId) => {
        return config.post('/chats/add-user-to-group', { userId, chatId })
            .then(({ data }) => {
                return data
            })
            .catch(err => {
                throw err
            })
    },

    leaveCurrentChat: (chatId) => {
        return config.post('/chats/leave-current-chat', { chatId })
            .then(({ data }) => {
                return data
            })
            .catch(err => {
                throw err
            })
    },

    deleteCurrentChat: (chatId) => {
        return config.delete(`/chats/${chatId}`)
            .then(({ data }) => {
                return data
            })
            .catch(err => {
                throw err
            })
    }
}

export default ChatService