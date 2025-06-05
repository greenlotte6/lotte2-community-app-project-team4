import React from 'react';

export const LeaveChat = ({ onClose, onLeave }) => {
  return (
    <div className="leavechat-overlay">
      <div className="leavechat-container">
        <h2>채팅방 나가기</h2>
        <p className="leavechat-subtitle">권한 주기</p>

        {/* 첫 번째 멤버/권한 */}
        <div className="leavechat-row">
          <select className="leavechat-select">
            <option>멤버 1</option>
            <option>멤버 2</option>
          </select>
          <select className="leavechat-select">
            <option>권한 1</option>
            <option>권한 2</option>
          </select>
        </div>

        {/* 두 번째 멤버/권한 */}
        <div className="leavechat-row">
          <select className="leavechat-select">
            <option>멤버 1</option>
            <option>멤버 2</option>
          </select>
          <select className="leavechat-select">
            <option>권한 1</option>
            <option>권한 2</option>
          </select>
        </div>

        {/* 버튼 */}
        <div className="leavechat-footer">
          <button onClick={onClose}>취소</button>
          <button onClick={onLeave}>나가기</button>
        </div>
      </div>
    </div>
  );
};
