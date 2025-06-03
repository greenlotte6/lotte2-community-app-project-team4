import React from 'react';

export const InviteModalSelected = () => {
  return (
    <>
      {/* 화살표 */}
      <div className="arrow-divider">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="#ccc"
          strokeWidth="2"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>

      {/* 선택된 대상 목록 */}
      <div className="invite-selected">
        {[...Array(7)].map((_, i) => (
          <div className="invite-item" key={i}>
            <img
              src="/images/message/avatars.png"
              className="avatar"
              alt="User"
            />
            <div className="user-info">
              <div className="user-name">두부씨 팀장</div>
              <div className="user-detail">홍길동</div>
            </div>
            <button className="remove-btn">&times;</button>
          </div>
        ))}
      </div>
    </>
  );
};
