import React from 'react';

export const LeaveChat = ({ onClose, onLeave }) => {
  return (
    <div className="leave-chat-container">
      <h2>채팅방 나가기</h2>
      <p className="subtitle">권한 주기</p>

      {/* 첫 번째 멤버/권한 */}
      <div className="leave-chat-row">
        <select className="leave-chat-select">
          <option>멤버 1</option>
          <option>멤버 2</option>
        </select>
        <select className="leave-chat-select">
          <option>권한 1</option>
          <option>권한 2</option>
        </select>
      </div>

      {/* 두 번째 멤버/권한 */}
      <div className="leave-chat-row">
        <select className="leave-chat-select">
          <option>멤버 1</option>
          <option>멤버 2</option>
        </select>
        <select className="leave-chat-select">
          <option>권한 1</option>
          <option>권한 2</option>
        </select>
      </div>

      {/* 버튼 */}
      <div className="modal-footer">
        <button onClick={onClose}>취소</button>
        <button onClick={onLeave}>나가기</button>
      </div>
    </div>
  );
};
