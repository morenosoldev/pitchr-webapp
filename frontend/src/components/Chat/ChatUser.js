import React from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function ChatUser({ chat, click }) {
  const currentChat = useSelector((state) => state.chat.currentChat);

  const isChatOpened = () => {
    return currentChat.id === chat.id ? "chat-active" : "";
  };

  const lastMessage = () => {
    if (chat.Messages.length === 0) return "";

    const message = chat.Messages[chat.Messages.length - 1].message;
    return message;
  };

  return (
    <>
      <Nav.Item as="li" className={`chat ${isChatOpened()}`} onClick={click}>
        <div
          style={{ paddingBottom: "10px" }}
          className="d-flex align-items-center"
        >
          <div className="avatar me-2">
            <img
              src={chat.Users[0].profile_pic}
              alt="chatuserimage"
              className="rounded-circle avatar-50"
            />
          </div>
          <div className="chat-sidebar-name">
            <h6 className="mb-0">{chat.Users[0].name}</h6>
            <span>{lastMessage()}</span>
          </div>
        </div>
      </Nav.Item>
    </>
  );
}
