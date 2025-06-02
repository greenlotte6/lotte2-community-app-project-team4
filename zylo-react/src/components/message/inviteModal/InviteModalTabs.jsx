import React from 'react'

export const InviteModalTabs = () => {
  return (
    <>
        {/* 헤더 */}
        <div className="invite-modal-header">
          <h2>대화상대 초대</h2>
          <button className="close-btn">&times;</button>
        </div>
        
        {/* 탭 */}
        <div className="invite-modal-tabs">
          <button className="tab active">사용자 검색</button>
          <button className="tab">조직도</button>
          <button className="tab">즐겨찾기</button>
        </div>
    </>
  )
}
