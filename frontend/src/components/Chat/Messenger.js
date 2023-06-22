import React from "react";
import { useSelector } from "react-redux";
import ChatContent from "./ChatContent";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";

export default function Messenger() {
  const chat = useSelector((state) => state.chat.currentChat);

  const activeChat = () => {
    return Object.keys(chat).length > 0;
  };

  return (
    <>
      {activeChat() ? (
        <>
          <ChatHeader chat={chat} />
          <ChatContent chat={chat} />
          <ChatFooter chat={chat} />
        </>
      ) : (
        <div className="noChat">
          <i
            className="noChatIcon fas fa-user-friends"
            style={{
              fontSize: "2rem",
              padding: 15,
              borderRadius: "50%",
              backgroundColor: "gray",
              color: "white",
            }}
          ></i>
          <p>No active chat</p>
        </div>
      )}
    </>
  );
}
