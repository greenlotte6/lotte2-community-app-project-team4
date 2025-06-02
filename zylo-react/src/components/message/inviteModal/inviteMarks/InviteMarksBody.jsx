import React from 'react'

export const InviteMarksBody = () => {
  return (
    <>
    {/* 사용자 목록 */}
    <div className="invite-Markslist">
        {/* 반복 사용자 항목 */}
        {[...Array(7)].map((_, i) => (
        <div
            className={`invite-item ${i === 0 ? "selected" : ""}`}
            key={i}
        >
            <img
            src="/images/avatars.png"
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
  )
}
