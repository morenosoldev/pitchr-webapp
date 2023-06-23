import { useEffect } from "react";
import socketIOClient from "socket.io-client";
import {
  fetchChats,
  onlineFriends,
  onlineFriend,
  offlineFriend,
  setSocket,
  receivedMessage,
  senderTyping,
  createChat,
  addUserToGroup,
  leaveCurrentChat,
  deleteCurrentChat,
} from "../store/actions/chat.action";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

function useSocket(user, dispatch) {
  useEffect(() => {
    dispatch(fetchChats()).then((res) => {
      const socket = socketIOClient.connect(API_ENDPOINT);

      dispatch(setSocket(socket));

      socket.emit("join", user);

      socket.on("typing", (sender) => {
        dispatch(senderTyping(sender));
      });

      socket.on("friends", (friends) => {
        dispatch(onlineFriends(friends));
      });

      socket.on("online", (user) => {
        dispatch(onlineFriend(user));
      });

      socket.on("offline", (user) => {
        dispatch(offlineFriend(user));
      });

      socket.on("received", (message) => {
        dispatch(receivedMessage(message, user.id));
      });

      socket.on("new-chat", (chat) => {
        dispatch(createChat(chat));
      });

      socket.on("added-user-to-group", (group) => {
        dispatch(addUserToGroup(group));
      });

      socket.on("remove-user-from-chat", (data) => {
        data.currentUserId = user.id;
        dispatch(leaveCurrentChat(data));
      });

      socket.on("delete-chat", (chatId) => {
        dispatch(deleteCurrentChat(chatId));
      });
    });
  }, [dispatch]);
}

export default useSocket;
