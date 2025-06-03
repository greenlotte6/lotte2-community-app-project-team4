import React, { useState } from 'react'

export const InviteDepartMembers = () => {
 const [selectedIndex, setSelectedIndex] = useState(null); 

  return (
    <>
      {/* 사용자 목록 */}
      <div className="invite-DepartMembers">
        {[...Array(7)].map((_, i) => (
          <div
            className={`invite-item ${selectedIndex === i ? "selected" : ""}`} 
            key={i}
            onClick={() => setSelectedIndex(i)} 
          >
            <img
              src="/images/message/avatars.png"
              className="avatar"
              alt="User"
            />
            <div className="user-info">
              <div className="user-name">두부씨 팀장</div>
              <div className="user-detail">홍길동</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
