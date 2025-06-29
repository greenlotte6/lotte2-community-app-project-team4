import React, { useEffect, useRef } from "react";
import { useTheme } from "../../../contexts/ThemeContext";

export const ChatRoomMessage = ({ messages, selectedChannel, senderId }) => {
  const { toggled } = useTheme();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  if (!selectedChannel) {
    return <div className="chat-room-messages empty">채널을 선택해주세요.</div>;
  }

  return (
    <div className="chat-room-messages">
      {messages.map((msg, idx) => {
        const isSelf = msg.senderId === senderId;

        return (
          <div
            key={msg.id || idx}
            className={isSelf ? "chat-room-message self" : "chat-room-message"}
          >
            {!isSelf && (
              <img
                className="avatar"
                src="/images/message/avatars.png"
                alt={msg.senderId}
              />
            )}

            <div className="message-wrapper">
              <div
                className={toggled ? "chat-room-meta dark" : "chat-room-meta"}
              >
                <strong>{isSelf ? "You" : msg.senderId}</strong>
                <span className="time">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div
                className={
                  toggled ? "chat-room-content dark" : "chat-room-content"
                }
              >
                <p>{msg.content}</p>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatRoomMessage;
