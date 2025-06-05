import React from "react";
import { useTheme } from "../../../contexts/ThemeContext";

export const ChatRoomMessage = () => {
  const { toggled } = useTheme();
  return (
    <>
      <div className="chat-room-messages">
        <div className="date-separator">Yesterday</div>

        {/* 예시 메시지 */}
        <div className="chat-room-message">
          <img
            className="avatar"
            src="/images/message/avatars.png"
            alt="Diana"
          />
          <div className="message-wrapper">
            <div className={toggled ? "chat-room-meta dark" : "chat-room-meta"}>
              <strong>Diana</strong>
              <span className="time">5:36 AM</span>
            </div>
            <div
              className={
                toggled ? "chat-room-content dark" : "chat-room-content"
              }
            >
              <p>Professional!</p>
            </div>
            <div className="unread-count">3</div>
          </div>
        </div>

        {/* 추가 메시지들 */}
        <div className="chat-room-message">
          <img
            className="avatar"
            src="/images/message/avatars.png"
            alt="Robert"
          />
          <div className="message-wrapper">
            <div className={toggled ? "chat-room-meta dark" : "chat-room-meta"}>
              <strong>Robert</strong>
              <span className="time">8:53 AM</span>
            </div>
            <div
              className={
                toggled ? "chat-room-content dark" : "chat-room-content"
              }
            >
              <div className="attachment">
                <img src="/images/message/cat.jpg" alt="dashboard" />
                <p>This new dashboard page. What do you think?</p>
              </div>
            </div>
            <div className="unread-count">3</div>
          </div>
        </div>

        {/* 내 메시지 */}
        <div className="chat-room-message self">
          <div className="message-wrapper">
            <div className={toggled ? "chat-room-meta dark" : "chat-room-meta"}>
              <strong>You</strong>
              <span className="time">1:36 PM</span>
            </div>
            <div
              className={
                toggled ? "chat-room-content dark" : "chat-room-content"
              }
            >
              <p>Wow it looks amazing.</p>
            </div>
            <div className="unread-count">3</div>
          </div>
        </div>
        <div className="date-separator">Today</div>

        {/* 예시 메시지 */}
        <div className="chat-room-message">
          <img
            className="avatar"
            src="/images/message/avatars.png"
            alt="Diana"
          />
          <div className="message-wrapper">
            <div className={toggled ? "chat-room-meta dark" : "chat-room-meta"}>
              <strong>Diana</strong>
              <span className="time">5:36 AM</span>
            </div>
            <div
              className={
                toggled ? "chat-room-content dark" : "chat-room-content"
              }
            >
              <p>Professional!</p>
            </div>
            <div className="unread-count">3</div>
          </div>
        </div>

        {/* 추가 메시지들 */}
        <div className="chat-room-message">
          <img
            className="avatar"
            src="/images/message/avatars.png"
            alt="Robert"
          />
          <div className="message-wrapper">
            <div className={toggled ? "chat-room-meta dark" : "chat-room-meta"}>
              <strong>Robert</strong>
              <span className="time">8:53 AM</span>
            </div>
            <div
              className={
                toggled ? "chat-room-content dark" : "chat-room-content"
              }
            >
              <div className="attachment">
                <img src="/images/message/cat.jpg" alt="dashboard" />
                <p>This new dashboard page. What do you think?</p>
              </div>
            </div>
            <div className="unread-count">3</div>
          </div>
        </div>

        {/* 내 메시지 */}
        <div className="chat-room-message self">
          <div className="message-wrapper">
            <div className={toggled ? "chat-room-meta dark" : "chat-room-meta"}>
              <strong>You</strong>
              <span className="time">1:36 PM</span>
            </div>
            <div
              className={
                toggled ? "chat-room-content dark" : "chat-room-content"
              }
            >
              <p>Wow it looks amazing.</p>
            </div>
            <div className="unread-count">3</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChatRoomMessage;
