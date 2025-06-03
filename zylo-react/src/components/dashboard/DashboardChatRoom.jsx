import React from "react";

export const DashboardChatRoom = () => {
  return (
    <>
      <div className="chat-room-message">
        <img className="avatar" src="/images/message/avatars.png" alt="Diana" />
        <div className="message-wrapper">
          <div className="chat-room-meta">
            <strong>Diana</strong>
            <span className="time">5:36 AM</span>
          </div>
          <div className="chat-room-content">
            <p>Professional!</p>
          </div>
          <div className="unread-count">3</div>
        </div>
      </div>
      <div className="chat-room-message">
        <img
          className="avatar"
          src="/images/message/avatars.png"
          alt="Robert"
        />
        <div className="message-wrapper">
          <div className="chat-room-meta">
            <strong>Robert</strong>
            <span className="time">8:53 AM</span>
          </div>
          <div className="chat-room-content">
            <div className="attachment">
              <p>This new dashboard page. What do you think?</p>
            </div>
          </div>
          <div className="unread-count">3</div>
        </div>
      </div>
    </>
  );
};
