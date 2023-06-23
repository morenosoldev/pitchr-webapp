import React from "react";
import Message from "./Message";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function ChatContent({ chat }) {
  const user = useSelector((state) => state.authentication.user);
  const senderTyping = useSelector((state) => state.chat.senderTyping);
  const [loading, setLoading] = useState(false);

  return (
    <div className="chat-content scroller">
      {loading ? (
        <span
          className="spinner-border spinner-border-sm mr-1"
          style={{ marginRight: 7 }}
        ></span>
      ) : null}
      {chat.Messages.map((message, index) => {
        return (
          <Message
            user={user}
            chat={chat}
            message={message}
            index={index}
            key={message.id}
          />
        );
      })}
      {senderTyping.typing && senderTyping.chatId === chat.id ? (
        <div className="message mt-5p">
          <div className="other-person">
            <p className="m-0">{senderTyping.fromUser.name} skriver...</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
